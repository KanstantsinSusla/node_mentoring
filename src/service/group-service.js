import database from '../config/database';
import ServiceError from '../errors/service-error';
import GroupDataMapper from '../mappers/group-mapper';
import Group from '../models/group-model';
import User from '../models/user-model';

export default class GroupService {
  static async add(groupDTO) {
    const group = GroupDataMapper.toDalEntity(groupDTO);

    try {
      return Group.create(group);
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  static async addUsersToGroup(groupId, userIds) {
    const transaction = await database.transaction();

    try {
      const group = await Group.findByPk(groupId);
      const users = await Promise.all(
        userIds.map(async (userId) => User.findByPk(userId)),
      );

      if (!group || !users || !users.length) {
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

  static async getById(id) {
    try {
      const group = await Group.findByPk(id);
      return group && GroupDataMapper.toDomain(group);
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  static async getAll() {
    try {
      const groups = await Group.findAll();
      return groups.map((group) => GroupDataMapper.toDomain(group));
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  static async update(id, groupDTO) {
    const updatedGroup = GroupDataMapper.toDalEntity(groupDTO);

    try {
      return Group.update(updatedGroup, {
        where: {
          id,
        },
        returning: true,
      });
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  static async delete(id) {
    try {
      await Group.destroy({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }
}
