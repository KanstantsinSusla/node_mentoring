import User from '../models/user-model';
import Group from '../models/group-model';
import UserDataMapper from '../mappers/user-mapper';
import GroupDataMapper from '../mappers/group-mapper';
import UserService from '../service/user-service';
import GroupService from '../service/group-service';

const userService = new UserService(User, UserDataMapper);
const groupService = new GroupService(Group, GroupDataMapper);

export { userService, groupService };
