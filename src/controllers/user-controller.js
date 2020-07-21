import UserService from '../service/user-service';

export const userLogin = async (request, response) => {
  const { login, password } = request.body;

  const user = await UserService.getByLogin(login);

  if (!user || password !== user.password) {
    response.status(401)
      .send({ message: 'Username or password is incorrect.' });
  }

  const accessToken = await UserService.userLogin(user);

  response.status(200)
    .json({
      accessToken,
      tokenType: 'Bearer',
    });
};

export const addUser = async (request, response) => {
  const userDTO = request.body;
  const user = await UserService.add(userDTO);

  response.status(201)
    .json(user);
};

export const getUserById = async (request, response) => {
  const user = await UserService.getById(request.params.id);

  if (!user) {
    response.status(404)
      .send({ message: 'User is not found.' });
  } else {
    response.status(200)
      .json(user);
  }
};

export const getUsers = async (request, response) => {
  const { limit, login } = request.query;
  let users;

  if (limit && login) {
    users = await UserService.getAutoSuggestUsers(login, limit);
    response.status(200)
      .send({ users });
  } else {
    users = await UserService.getAll();
    response.status(200)
      .send({ users });
  }
};

export const updateUser = async (request, response) => {
  const userId = request.params.id;

  const user = await UserService.getById(userId);

  if (user) {
    const updatedUser = await UserService.update(userId, request.body);

    response.status(200)
      .send(updatedUser);
  } else {
    response.status(404)
      .send({ message: 'User is not found.' });
  }
};

export const deleteUser = async (request, response) => {
  const userId = request.params.id;

  const user = await UserService.getById(userId);

  if (user) {
    await UserService.delete(request.params.id);

    response.status(200)
      .send({ message: 'User has been removed.' });
  } else {
    response.status(404)
      .send({ message: 'User is not found.' });
  }
};
