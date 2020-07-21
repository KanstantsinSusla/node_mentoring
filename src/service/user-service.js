import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import ServiceError from '../errors/service-error';
import User from '../models/user-model';
import UserDataMapper from '../mappers/user-mapper';

export default class UserService {
  static async userLogin(user) {
    const payload = {
      user: user.login,
      age: user.age,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
  }

  static async add(userDTO) {
    const user = UserDataMapper.toDalEntity(userDTO);

    try {
      return await User.create(user);
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  static async getAutoSuggestUsers(login, limit) {
    try {
      const users = await User.findAll({
        where: {
          login: {
            [Op.like]: `%${login}%`,
          },
        },
        limit,
      });

      return users.map((user) => UserDataMapper.toDomain(user));
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  static async getById(id) {
    try {
      const user = await User.findByPk(id);
      return user && UserDataMapper.toDomain(user);
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  static async getByLogin(login) {
    try {
      return await User.findOne({ where: { login } });
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  static async getAll() {
    try {
      const users = await User.findAll();
      return users.map((user) => UserDataMapper.toDomain(user));
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }

  static async update(id, userDTO) {
    const updatedUser = UserDataMapper.toDalEntity(userDTO);

    try {
      return User.update(updatedUser, {
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
      await User.destroy({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new ServiceError(e.message);
    }
  }
}
