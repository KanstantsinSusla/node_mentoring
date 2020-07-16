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


test('gets all groups', async () => {
  const request = {};
  const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    send: jest.fn(),
  };
  response.status.mockReturnValueOnce(response);
  const next = jest.fn();

  const allGroups = [{ name: 'group' }];
  GroupService.getAll.mockResolvedValueOnce(allGroups);

  await getGroups(request, response, next);

  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.send).toHaveBeenCalledTimes(1);
  expect(response.send.mock.calls.length).toBe(1);
  expect(response.send).toHaveBeenCalledWith({ groups: allGroups });
});

test('gets all groups if groups are not exist', async () => {
  const request = {};
  const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    send: jest.fn(),
  };
  response.status.mockReturnValueOnce(response);
  const next = jest.fn();

  const groups = null;
  GroupService.getAll.mockResolvedValueOnce(groups);

  await getGroups(request, response, next);

  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.send).toHaveBeenCalledTimes(1);
  expect(response.send.mock.calls.length).toBe(1);
  expect(response.send).toHaveBeenCalledWith({ groups });
});

test('adds user to group', async () => {
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
  const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    send: jest.fn(),
  };
  response.status.mockReturnValueOnce(response);
  const next = jest.fn();

  GroupService.addUsersToGroup.mockResolvedValueOnce(id, userIds);

  await addUsersToGroup(request, response, next);

  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.send).toHaveBeenCalledTimes(1);
  expect(response.send.mock.calls.length).toBe(1);
  expect(response.send).toHaveBeenCalledWith({ message: 'Users are added to group' });
});

test('adds user to group when users are not added', async () => {
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
  const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    send: jest.fn(),
  };
  response.status.mockReturnValueOnce(response);
  const next = jest.fn();

  GroupService.addUsersToGroup.mockResolvedValueOnce(null);

  await addUsersToGroup(request, response, next);

  expect(response.status).toHaveBeenCalledWith(400);
  expect(response.send).toHaveBeenCalledTimes(1);
  expect(response.send.mock.calls.length).toBe(1);
  expect(response.send).toHaveBeenCalledWith({ message: 'Users are not added to group.' });
});


test('gets group by ID', async () => {
  const id = uuidv4();

  const request = {
    params: {
      id,
    },
  };
  const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    send: jest.fn(),
  };
  response.status.mockReturnValueOnce(response);
  const next = jest.fn();

  const group = { id };
  GroupService.getById.mockResolvedValueOnce(group);

  await getGroupById(request, response, next);

  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledTimes(1);
  expect(response.json.mock.calls.length).toBe(1);
  expect(response.json).toHaveBeenCalledWith(group);
});

test('gets group by ID with when group is not exist', async () => {
  const request = {
    params: {
      id: null,
    },
  };
  const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    send: jest.fn(),
  };
  response.status.mockReturnValueOnce(response);
  const next = jest.fn();

  const group = null;

  GroupService.getById.mockResolvedValueOnce(group);

  await getGroupById(request, response, next);

  expect(response.status).toHaveBeenCalledWith(404);
  expect(response.send).toHaveBeenCalledTimes(1);
  expect(response.send.mock.calls.length).toBe(1);
  expect(response.send).toHaveBeenCalledWith({ message: 'Group is not found.' });
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
  const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    send: jest.fn(),
  };
  response.status.mockReturnValueOnce(response);
  const next = jest.fn();

  const addedGroup = { name, permissions };

  GroupService.add.mockResolvedValueOnce(addedGroup);

  await addGroup(request, response, next);

  expect(response.status).toHaveBeenCalledWith(201);
  expect(response.json).toHaveBeenCalledTimes(1);
  expect(response.json.mock.calls.length).toBe(1);
});

test('updates group', async () => {
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

  const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    send: jest.fn(),
  };
  response.status.mockReturnValueOnce(response);
  const next = jest.fn();

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


test('updates group when group is not exist', async () => {
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

  const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    send: jest.fn(),
  };
  response.status.mockReturnValueOnce(response);
  const next = jest.fn();

  const targetGroup = null;
  GroupService.getById.mockResolvedValueOnce(targetGroup);

  await updateGroup(request, response, next);

  expect(response.status).toHaveBeenCalledWith(404);
  expect(response.send).toHaveBeenCalledTimes(1);
  expect(response.send.mock.calls.length).toBe(1);
  expect(response.send).toHaveBeenCalledWith({ message: 'Group is not found.' });
});


test('deletes group', async () => {
  const id = uuidv4();

  const request = {
    params: {
      id,
    },
  };

  const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    send: jest.fn(),
  };
  response.status.mockReturnValueOnce(response);
  const next = jest.fn();

  const targetGroup = { id };
  GroupService.getById.mockResolvedValueOnce(targetGroup);
  GroupService.delete.mockResolvedValueOnce(targetGroup);

  await deleteGroup(request, response, next);

  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.send).toHaveBeenCalledTimes(1);
  expect(response.send.mock.calls.length).toBe(1);
  expect(response.send).toHaveBeenCalledWith({ message: 'Group has been removed.' });
});


test('deletes group when group is not exist', async () => {
  const id = uuidv4();

  const request = {
    params: {
      id,
    },
  };

  const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    send: jest.fn(),
  };
  response.status.mockReturnValueOnce(response);
  const next = jest.fn();

  const targetGroup = null;
  GroupService.getById.mockResolvedValueOnce(targetGroup);

  await deleteGroup(request, response, next);

  expect(response.status).toHaveBeenCalledWith(404);
  expect(response.send).toHaveBeenCalledTimes(1);
  expect(response.send.mock.calls.length).toBe(1);
  expect(response.send).toHaveBeenCalledWith({ message: 'Group is not found.' });
});
