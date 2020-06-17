import database from '../config/database';
import ServiceError from '../errors/service-error';

export default class GroupService {
  constructor(groupModel, groupDataMapper, userModel) {
    this.groupModel = groupModel;
    this.groupDataMapper = groupDataMapper;
    this.userModel = userModel;
  }

  async add(groupDTO) {
    const group = this.groupDataMapper.toDalEntity(groupDTO);

    try {
      return this.groupModel.create(group);
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  async addUsersToGroup(groupId, userIds) {
    const transaction = await database.transaction();

    try {
      const group = await this.groupModel.findByPk(groupId);
      const users = await Promise.all(
        userIds.map(async (userId) => this.userModel.findByPk(userId)),
      );

      if (!group || !users) {
        return false;
      }
      await group.addUsers(users, { through: { selfGranted: false } }, { transaction });
      await transaction.commit();
      return true;
    } catch (e) {
      await transaction.rollback();
      throw new ServiceError(e.message);
    }
  }

  async getById(id) {
    try {
      const group = await this.groupModel.findByPk(id);
      return group && this.groupDataMapper.toDomain(group);
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  async getAll() {
    try {
      const groups = await this.groupModel.findAll();
      return groups.map((group) => this.groupDataMapper.toDomain(group));
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  async update(id, groupDTO) {
    const updatedGroup = this.groupDataMapper.toDalEntity(groupDTO);

    try {
      return this.groupModel.update(updatedGroup, {
        where: {
          id,
        },
        returning: true,
      });
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  async delete(id) {
    try {
      await this.groupModel.destroy({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }
}
