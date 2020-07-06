import { userService } from '../containers/di-container';

export const userLogin = async (request, response) => {
  const { login, password } = request.body;

  const user = await userService.getByLogin(login);

  if (!user) {
    response.status(404)
      .send({ message: 'User is not found.' });
  }

  if (password !== user.password) {
    response.status(400)
      .send({ message: 'Incorrect password.' });
  }

  const accessToken = await userService.userLogin(user);

  if (accessToken) {
    response.status(200).json({
      accessToken,
      tokenType: 'Bearer',
    });
  } else {
    response.status(403).send({ message: 'Bad client credentials' });
  }
};

export const addUser = async (request, response) => {
  const userDTO = request.body;
  const user = await userService.add(userDTO);

  response.status(201)
    .json(user);
};

export const getUserById = async (request, response) => {
  const user = await userService.getById(request.params.id);

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
    users = await userService.getAutoSuggestUsers(login, limit);
    response.status(200)
      .send({ users });
  } else {
    users = await userService.getAll();
    response.status(200)
      .send({ users });
  }
};

export const updateUser = async (request, response) => {
  const userId = request.params.id;

  const user = await userService.getById(userId);

  if (user) {
    const updatedUser = await userService.update(userId, request.body);

    response.status(200)
      .send(updatedUser);
  } else {
    response.status(404)
      .send({ message: 'User is not found.' });
  }
};

export const deleteUser = async (request, response) => {
  const userId = request.params.id;

  const user = await userService.getById(userId);

  if (user) {
    await userService.delete(request.params.id);

    response.status(200)
      .send({ message: 'User has been removed.' });
  } else {
    response.status(404)
      .send({ message: 'User is not found.' });
  }
};
