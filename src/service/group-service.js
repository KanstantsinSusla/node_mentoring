import ServiceError from '../errors/service-error';

export default class GroupService {
  constructor(groupModel, groupDataMapper) {
    this.groupModel = groupModel;
    this.groupDataMapper = groupDataMapper;
  }

  async add(groupDTO) {
    const group = this.groupDataMapper.toDalEntity(groupDTO);

    try {
      return this.groupModel.create(group);
    } catch (e) {
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
