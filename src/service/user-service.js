import { Op } from 'sequelize';
import {} from 'express-async-errors';

export default class UserService {
    constructor(userModel, userDataMapper) {
        this.userModel = userModel;
        this.userDataMapper = userDataMapper;
    }

    async add(userDTO) {
        const user = this.userDataMapper.toDalEntity(userDTO);
        return (await this.userModel.create(user));
    };

    async getAutoSuggestUsers(login, limit) {
        const users = await this.userModel.findAll({
            where: {
                login: {
                    [Op.like]: '%' + login + '%',
                },
            },
            limit: limit,
        });

        return users.map(user => this.userDataMapper.toDomain(user));
    };

    async getById(id) {
        const user = await this.userModel.findByPk(id);
        return user ? this.userDataMapper.toDomain(user) : null;
    };

    async getAll() {
        const users = await this.userModel.findAll();
        return users.map(user => this.userDataMapper.toDomain(user));
    }

    async update(id, userDTO) {
        const updatedUser = this.userDataMapper.toDalEntity(userDTO);

        return (await this.userModel.update(updatedUser, {
            where: {
                id: id,
            },
        }));
    }

    async delete(id) {
        await this.userModel.destroy({
            where: {
                id: id,
            },
        });
    }
}