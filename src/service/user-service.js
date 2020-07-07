import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import ServiceError from '../errors/service-error';

export default class UserService {
  constructor(userModel, userDataMapper) {
    this.userModel = userModel;
    this.userDataMapper = userDataMapper;
  }

  static async userLogin(user) {
    const payload = {
      user: user.login,
      age: user.age,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
  }

  async add(userDTO) {
    const user = this.userDataMapper.toDalEntity(userDTO);

    try {
      return this.userModel.create(user);
    } catch (e) {
      throw new ServiceError(e.message);
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
      throw new ServiceError(e.message);
    }
  }

  async getById(id) {
    try {
      const user = await this.userModel.findByPk(id);
      return user && this.userDataMapper.toDomain(user);
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  async getByLogin(login) {
    try {
      return await this.userModel.findOne({ where: { login } });
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  async getAll() {
    try {
      const users = await this.userModel.findAll();
      return users.map((user) => this.userDataMapper.toDomain(user));
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  async update(id, userDTO) {
    const updatedUser = this.userDataMapper.toDalEntity(userDTO);

    try {
      return this.userModel.update(updatedUser, {
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
      await this.userModel.destroy({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }
}
