import User from '../models/user-model';

exports.addUser = (request, response) => {
    const {login, password, age} = request.body;

    const user = new User(login, password, age);
    user.save();

    response.status(201).json(user);
}

exports.getAutoSuggestUsers = (request, response) => {
    if (!request.params.login && !request.params.limit) {
        response.status(400).send({message: 'Params can not be empty'});
        return;
    }

    const users = User.getAutoSuggestUsers(request.params.login, request.params.limit);
    response.status(200).json(users);
}

exports.getUserById = (request, response) => {
    const user = User.getById(request.params.id);

    if (!user) {
        response.status(404).send({message: 'User is not found.'})
    } else {
        response.status(200).json(user);
    }
}

exports.getUsers = (request, response) => {
    const {limit, login} = request.query;
    let users;

    if (!limit && !login) {
        users = User.getAutoSuggestUsers(request.params.login, request.params.limit);
        response.status(200).json(users);
    } else {
        users = User.getAll();
        response.status(200).send({users});
    }
}

exports.updateUser = (request, response) => {
    if (!request.params.id) {
        response.status(400).send({message: 'Id can not be empty'});
        return;
    }

    const updatedUser = User.update(request.params.id, request.body);
    response.status(200).send(updatedUser);
}

exports.deleteUser = (request, response) => {
    if (!request.params.id) {
        response.status(400).send({message: 'Id can not be empty'});
        return;
    }

    User.delete(request.params.id);
    response.status(200).send({message: "User has been removed."});
}



