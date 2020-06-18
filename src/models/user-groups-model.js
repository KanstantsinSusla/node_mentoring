import database from '../config/database';
import User from './user-model';
import Group from './group-model';

const UserGroups = database.define('User_Groups');
User.belongsToMany(Group, { through: 'User_Groups' });
Group.belongsToMany(User, { through: 'User_Groups' });

UserGroups.sync({ force: true });
