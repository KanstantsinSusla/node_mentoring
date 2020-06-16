import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import database from '../config/database';

const groups = [
  {
    id: uuidv4(),
    name: 'GROUP1',
    permissions: ['READ', 'WRITE'],
  },
  {
    id: uuidv4(),
    name: 'GROUP2',
    permissions: ['READ'],
  },
];

const Group = database.define('group', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  permissions: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  },
});

Group.beforeValidate((group) => {
  const incomingGroup = group;
  if (!incomingGroup.id) {
    incomingGroup.id = uuidv4();
  }
});

Group.sync({ force: true })
  .then(() => Group.bulkCreate(groups));

export default Group;
