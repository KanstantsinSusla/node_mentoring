import 'babel-polyfill';
import UserService from '../../src/service/user-service';
import { getUsers } from '../../src/controllers/user-controller';

jest.mock(UserService);


test('gets all users', async () => {
  const request = {
    query: {
      limit: null,
      login: null,
    },
  };
  const status = jest.fn();
  const response = {
    status,
    json: jest.fn(),
  };
  status.mockReturnValueOnce(response);
  const next = jest.fn();

  const allUsers = [{ id: '123' }];
  UserService.getAll.mockResolvedValueOnce(allUsers);

  await getUsers(request, response, next);

  expect(status.mock.calls.length).toBe(1);
});
