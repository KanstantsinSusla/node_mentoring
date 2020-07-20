import 'babel-polyfill';
import { v4 as uuidv4 } from 'uuid';
import GroupService from '../../src/service/group-service';
import {
  addGroup, addUsersToGroup, getGroups, getGroupById, updateGroup, deleteGroup,
} from '../../src/controllers/group-controller';

jest.mock('../../src/service/group-service', () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  addUsersToGroup: jest.fn(),
  add: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));


describe('group controller', () => {
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

  describe('get all groups method', () => {
    const request = {};

    test('should return all groups', async () => {
      const allGroups = [{ name: 'group' }];
      GroupService.getAll.mockResolvedValueOnce(allGroups);

      await getGroups(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ groups: allGroups });
    });

    test('should return empty array if there are no groups', async () => {
      const groups = null;
      GroupService.getAll.mockResolvedValueOnce(groups);

      await getGroups(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ groups });
    });
  });

  describe('add users to group method', () => {
    const id = uuidv4();
    const userIds = ['123', '34535'];

    const request = {
      params: {
        id,
        login: 'text',
      },
      body: {
        userIds,
      },
    };

    test('should return success message after correct adding users to group', async () => {
      GroupService.addUsersToGroup.mockResolvedValueOnce(id, userIds);

      await addUsersToGroup(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'Users are added to group' });
    });

    test('should return error message after incorrect adding users to group', async () => {
      GroupService.addUsersToGroup.mockResolvedValueOnce(null);

      await addUsersToGroup(request, response, next);

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'Users are not added to group.' });
    });
  });

  describe('get group by ID method', () => {
    test('should return group by ID', async () => {
      const id = uuidv4();

      const request = {
        params: {
          id,
        },
      };

      const group = { id };
      GroupService.getById.mockResolvedValueOnce(group);

      await getGroupById(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json.mock.calls.length).toBe(1);
      expect(response.json).toHaveBeenCalledWith(group);
    });

    test('should return error message if there is no group', async () => {
      const request = {
        params: {
          id: null,
        },
      };

      const group = null;
      GroupService.getById.mockResolvedValueOnce(group);

      await getGroupById(request, response, next);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'Group is not found.' });
    });
  });

  test('adds group', async () => {
    const name = 'test_name';
    const permissions = ['READ', 'WRITE'];

    const request = {
      body: {
        name,
        permissions,
      },
    };

    const addedGroup = { name, permissions };
    GroupService.add.mockResolvedValueOnce(addedGroup);

    await addGroup(request, response, next);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json.mock.calls.length).toBe(1);
  });

  describe('update group method', () => {
    const id = uuidv4();
    const name = 'test_name';
    const permissions = ['READ', 'WRITE'];

    const request = {
      params: {
        id,
      },
      body: {
        name,
        permissions,
      },
    };

    test('should update group', async () => {
      const targetGroup = { id };
      const updatedGroup = {
        id, name, permissions,
      };
      GroupService.getById.mockResolvedValueOnce(targetGroup);
      GroupService.update.mockResolvedValueOnce(updatedGroup);

      await updateGroup(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
    });

    test('should return error message if there is no group', async () => {
      const targetGroup = null;
      GroupService.getById.mockResolvedValueOnce(targetGroup);

      await updateGroup(request, response, next);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'Group is not found.' });
    });
  });

  describe('delete group method', () => {
    const id = uuidv4();

    const request = {
      params: {
        id,
      },
    };

    test('should return success message', async () => {
      const targetGroup = { id };
      GroupService.getById.mockResolvedValueOnce(targetGroup);
      GroupService.delete.mockResolvedValueOnce(targetGroup);

      await deleteGroup(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'Group has been removed.' });
    });

    test('should return error message if there is no group', async () => {
      const targetGroup = null;
      GroupService.getById.mockResolvedValueOnce(targetGroup);

      await deleteGroup(request, response, next);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send.mock.calls.length).toBe(1);
      expect(response.send).toHaveBeenCalledWith({ message: 'Group is not found.' });
    });
  });
});
