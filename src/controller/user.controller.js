import User from '../model/user.model.js'

exports.addUser = function (request, response){
    const login = request.body.login;
    const password = request.body.password;
    const age = request.body.age;

    const user = new User(login, password, age);
    user.save();

    response.status(200).json(user);
}

exports.getAutoSuggestUsers = function (request, response){
    if (!request.params.login && !request.params.limit) {
        response.status(400).send({messages: 'Params can not be empty'});
        return;
    }

    const users = User.getAutoSuggestUsers(request.params.login, request.params.limit);
    response.status(200).json(users);
}

exports.getUserById = function (request, response){
    if (!request.params.id) {
        response.status(400).send({messages: 'Id can not be empty'});
        return;
    }

    const user = User.getById(request.params.id);
    response.status(200).json(user);
}

exports.getAllUsers = function (request, response){
    const users = User.getAll();

    response.status(200).send({
        users: users
    });
}

exports.updateUser = function (request, response){
    if (!request.params.id) {
        response.status(400).send({messages: 'Id can not be empty'});
        return;
    }

    const updatedUser = User.update(request.params.id, request.body);
    response.status(200).send(updatedUser);
}

exports.deleteUser = function (request, response){
    if (!request.params.id) {
        response.status(400).send({messages: 'Id can not be empty'});
        return;
    }

    User.delete(request.params.id);
    response.status(200).send({messages: "User has been removed."});
}



