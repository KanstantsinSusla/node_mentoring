import User from '../models/user-model';

exports.addUser = (request, response) => {
    const {login, password, age} = request.body;

    const user = new User(login, password, age);
    user.save();

    response.status(201).json(user);
}

exports.getUserById = (request, response) => {
    const user = User.getById(request.params.id);

    if (!user) {
        response.status(404).send({message: 'User is not found.'});
    } else {
        response.status(200).json(user);
    }
}

exports.getUsers = (request, response) => {
    const {limit, login} = request.query;
    let users;

    if (limit && login) {
        users = User.getAutoSuggestUsers(login, limit);
        response.status(200).send({users});
    } else {
        users = User.getAll();
        response.status(200).send({users});
    }
}

exports.updateUser = (request, response) => {
    const userId = request.params.id;

    if (User.getById(userId)){
        const updatedUser = User.update(userId, request.body);
        response.status(200).send(updatedUser);
    } else {
        response.status(404).send({message: 'User is not found.'});
    }
}

exports.deleteUser = (request, response) => {
    const userId = request.params.id;

    if (User.getById(userId)){
        User.delete(request.params.id);
        response.status(200).send({message: "User has been removed."});
    } else {
        response.status(404).send({message: 'User is not found.'});
    }
}



