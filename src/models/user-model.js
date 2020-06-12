import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import database from '../config/database';

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

User.beforeValidate((user) => {
  const incomingUser = user;
  if (!incomingUser.id) {
    incomingUser.id = uuidv4();
  }
});

User.sync({ force: true })
  .then(() => User.bulkCreate(users));

export default User;
