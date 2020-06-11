import { Op } from 'sequelize';
import ServiceError from '../errors/service-error';

export default class UserService {
  constructor(userModel, userDataMapper) {
    this.userModel = userModel;
    this.userDataMapper = userDataMapper;
  }

  async add(userDTO) {
    const user = this.userDataMapper.toDalEntity(userDTO);

    try {
      return this.userModel.create(user);
    } catch (e) {
      throw new ServiceError(`User service error: ${e.message}`);
    }
  }

  async getAutoSuggestUsers(login, limit) {
    try {
      const users = await this.userModel.findAll({
        where: {
          login: {
            [Op.like]: `%${login}%`,
          },
        },
        limit,
      });

      return users.map((user) => this.userDataMapper.toDomain(user));
    } catch (e) {
      throw new ServiceError(`User service error: ${e.message}`);
    }
  }

  async getById(id) {
    try {
      const user = await this.userModel.findByPk(id);
      return user && this.userDataMapper.toDomain(user);
    } catch (e) {
      throw new ServiceError(`User service error: ${e.message}`);
    }
  }

  async getAll() {
    try {
      const users = await this.userModel.findAll();
      return users.map((user) => this.userDataMapper.toDomain(user));
    } catch (e) {
      throw new ServiceError(`User service error: ${e.message}`);
    }
  }

  async update(id, userDTO) {
    const updatedUser = this.userDataMapper.toDalEntity(userDTO);

    try {
      return this.userModel.update(updatedUser, {
        where: {
          id,
        },
      });
    } catch (e) {
      throw new ServiceError(`User service error: ${e.message}`);
    }
  }

  async delete(id) {
    try {
      await this.userModel.destroy({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new ServiceError(`User service error: ${e.message}`);
    }
  }
}
