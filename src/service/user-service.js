import {Op} from "sequelize";

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
        return (await this.userModel.findAll({
            where: {
                login: {
                    [Op.like]: '%' + login + '%'
                }
            },
            limit: limit,
        }).then(users => {
            return users.map(user => this.userDataMapper.toDomain(user));
        }));
    };

    async getById(id) {
        return (await this.userModel.findByPk(id).then(user => {
            return this.userDataMapper.toDomain(user);
        }));
    };

    async getAll() {
        return (await this.userModel.findAll().then(users => {
            return users.map(user => this.userDataMapper.toDomain(user));
        }));
    }

    async update(id, userDTO) {
        const updatedUser = this.userDataMapper.toDalEntity(userDTO);

        return (await this.userModel.update(updatedUser, {
            where: {
                id: id
            }
        }));
    }

    async delete(id) {
        await this.userModel.destroy({
            where: {
                id: id
            }
        })
    }
}