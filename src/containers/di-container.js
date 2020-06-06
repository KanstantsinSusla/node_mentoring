import User from "../models/user-model";
import UserDataMapper from "../mappers/user-mapper";
import UserService from "../service/user-service";

const userDataMapper = new UserDataMapper();
const userService = new UserService(User, userDataMapper);

module.exports = {
    userService
};