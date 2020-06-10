import Sequelize from 'sequelize';
import database from '../config/database';
import { v4 as uuidv4 } from 'uuid';

const users = [
    {
        id: uuidv4(),
        login: 'asd',
        password: 'asd',
        age: '12',
    },
    {
        id: uuidv4(),
        login: 'asdasdasd',
        password: 'asdasdasd',
        age: '134232',
    },
];

const User = database.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    login: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    age: {
        type: Sequelize.STRING,
    },
});

User.beforeValidate((user, options) => {
    if (!user.id) {
        user.id = uuidv4();
    }
});

User.sync({ force: true }).then(() => {
    return User.bulkCreate(users);
});

export default User;