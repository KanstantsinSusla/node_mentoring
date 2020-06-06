import serviceContainer from "../containers/di-container";

const userService = serviceContainer.userService;

exports.addUser = (request, response) => {
    const userDTO = request.body;

    const user = userService.add(userDTO);

    user.then(user => {
        response.status(201).json(user);
    });
}

exports.getUserById = (request, response) => {
    const user = userService.getById(request.params.id);

    user.then(user => {
        if (!user) {
            response.status(404).send({message: 'User is not found.'});
        } else {
            response.status(200).json(user);
        }
    });
}

exports.getUsers = (request, response) => {
    const {limit, login} = request.query;
    let users;

    if (limit && login) {
        users = userService.getAutoSuggestUsers(login, limit);

        users.then(users => {
            response.status(200).send({users});
        })
    } else {
        users = serviceContainer.userService.getAll();

        users.then(users => {
            response.status(200).send({users});
        });
    }
}

exports.updateUser = (request, response) => {
    const userId = request.params.id;

    const user = userService.getById(userId);

    if (user) {
        const updatedUser = userService.update(userId, request.body);

        updatedUser.then(updatedUser => {
            response.status(200).send(updatedUser);
        })
    } else {
        response.status(404).send({message: 'User is not found.'});
    }
}

exports.deleteUser = (request, response) => {
    const userId = request.params.id;

    const user = userService.getById(userId);

    if (user) {
        userService.delete(request.params.id);
        response.status(200).send({message: "User has been removed."});
    } else {
        response.status(404).send({message: 'User is not found.'});
    }
}



