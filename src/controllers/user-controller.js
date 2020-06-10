import serviceContainer from '../containers/di-container';

const userService = serviceContainer.userService;

export const addUser = async (request, response) => {
    const userDTO = request.body;

    const user = await userService.add(userDTO);
    response.status(201).json(user);
};

export const getUserById = async (request, response) => {
    const user = await userService.getById(request.params.id);

    if (!user) {
        response.status(404).send({ message: 'User is not found.' });
    } else {
        response.status(200).json(user);
    }
};

export const getUsers = async (request, response) => {
    const { limit, login } = request.query;
    let users;

    if (limit && login) {
        users = userService.getAutoSuggestUsers(login, limit);

        users.then(users => {
            response.status(200).send({ users });
        });
    } else {
        users = await userService.getAll();
        response.status(200).send({ users });
    }
};

export const updateUser = async (request, response) => {
    const userId = request.params.id;

    const user = userService.getById(userId);

    if (user) {
        const updatedUser = userService.update(userId, request.body);

        updatedUser.then(updatedUser => {
            response.status(200).send(updatedUser);
        });
    } else {
        response.status(404).send({ message: 'User is not found.' });
    }
};

export const deleteUser = (request, response) => {
    const userId = request.params.id;

    const user = userService.getById(userId);

    if (user) {
        userService.delete(request.params.id);
        response.status(200).send({ message: 'User has been removed.' });
    } else {
        response.status(404).send({ message: 'User is not found.' });
    }
};



