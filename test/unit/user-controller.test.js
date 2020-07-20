import 'babel-polyfill';
import { v4 as uuidv4 } from 'uuid';
import UserService from '../../src/service/user-service';
import {
  getUsers, getUserById, addUser, updateUser, deleteUser, userLogin,
} from '../../src/controllers/user-controller';

jest.mock('../../src/service/user-service', () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  getAutoSuggestUsers: jest.fn(),
  add: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  userLogin: jest.fn(),
  getByLogin: jest.fn(),
}));

describe('user controller', () => {
  let response;
  let next;

  beforeEach(() => {
    response = {
      status: jest.fn(() => response),
      json: jest.fn(),
      send: jest.fn(),
    };
    response.status.mockReturnValueOnce(response);
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get all users method', () => {
    const request = {
      query: {
        limit: null,
        login: null,
      },
    };

    test('should return all users', async () => {
      const allUsers = [{ id: '123' }];
      UserService.getAll.mockResolvedValueOnce(allUsers);

      await getUsers(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ users: allUsers });
    });

    test('should return empty array if there are no users', async () => {
      const nullUsers = null;
      UserService.getAll.mockResolvedValueOnce(nullUsers);

      await getUsers(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ users: nullUsers });
    });
  });

  test('gets auto suggest users', async () => {
    const request = {
      query: {
        limit: 10,
        login: 'text',
      },
    };

    const autoSuggestUsers = [{ id: '123' }];
    UserService.getAutoSuggestUsers.mockResolvedValueOnce(autoSuggestUsers);

    await getUsers(request, response, next);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send.mock.calls.length).toBe(1);
    expect(response.send).toHaveBeenCalledWith({ users: autoSuggestUsers });
  });


  describe('get user by ID method', () => {
    test('should return user by ID', async () => {
      const id = uuidv4();

      const request = {
        params: {
          id,
        },
      };

      const user = { id };
      UserService.getById.mockResolvedValueOnce(user);

      await getUserById(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json.mock.calls.length).toBe(1);
      expect(response.json).toHaveBeenCalledWith(user);
    });

    test('should return error message if there is no user ', async () => {
      const request = {
        params: {
          id: null,
        },
      };

      const user = null;
      UserService.getById.mockResolvedValueOnce(user);

      await getUserById(request, response, next);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'User is not found.' });
    });
  });

  test('adds user', async () => {
    const login = 'test_login';
    const password = 'test_password';
    const age = 'test_age';

    const request = {
      body: {
        login,
        password,
        age,
      },
    };

    const addedUser = { login, password, age };
    UserService.add.mockResolvedValueOnce(addedUser);

    await addUser(request, response, next);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json.mock.calls.length).toBe(1);
  });

  describe('update user method', () => {
    const id = uuidv4();
    const login = 'test_login';
    const password = 'test_password';
    const age = 'test_age';

    const request = {
      params: {
        id,
      },
      body: {
        login,
        password,
        age,
      },
    };

    test('should update user', async () => {
      const targetUser = { id };
      const updatedUser = {
        id, login, password, age,
      };
      UserService.getById.mockResolvedValueOnce(targetUser);
      UserService.update.mockResolvedValueOnce(updatedUser);

      await updateUser(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
    });

    test('should return error message if there is no user', async () => {
      const targetUser = null;
      UserService.getById.mockResolvedValueOnce(targetUser);

      await updateUser(request, response, next);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'User is not found.' });
    });
  });


  describe('delete user method', () => {
    const id = uuidv4();

    const request = {
      params: {
        id,
      },
    };

    test('should delete user', async () => {
      const targetUser = { id };
      UserService.getById.mockResolvedValueOnce(targetUser);
      UserService.delete.mockResolvedValueOnce(targetUser);

      await deleteUser(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'User has been removed.' });
    });

    test('should return error message if there is no user', async () => {
      const targetUser = null;
      UserService.getById.mockResolvedValueOnce(targetUser);

      await deleteUser(request, response, next);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'User is not found.' });
    });
  });

  describe('user login method', () => {
    const login = 'login_test';
    const password = 'password_test';

    const request = {
      body: {
        login,
        password,
      },
    };

    test('should return access token', async () => {
      const accessToken = 'token';
      const tokenType = 'Bearer';
      const targetUser = { login, password };
      UserService.getById.mockResolvedValueOnce(targetUser);
      UserService.userLogin.mockResolvedValueOnce(accessToken);

      await userLogin(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json.mock.calls.length).toBe(1);
      expect(response.json).toHaveBeenCalledWith({ accessToken, tokenType });
    });

    test('should return error message when there is no user', async () => {
      const targetUser = null;
      UserService.getByLogin.mockResolvedValueOnce(targetUser);

      await userLogin(request, response, next);

      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'Username or password is incorrect.' });
    });

    test('should return error message when users credentials are wrong', async () => {
      const userPassword = 'user_password';
      const targetUser = { login, userPassword };
      UserService.getByLogin.mockResolvedValueOnce(targetUser);

      await userLogin(request, response, next);

      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'Username or password is incorrect.' });
    });
  });
});
