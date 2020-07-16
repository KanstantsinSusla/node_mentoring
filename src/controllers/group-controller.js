import GroupService from '../service/group-service';

export const addGroup = async (request, response) => {
  const groupDTO = request.body;
  const group = await GroupService.add(groupDTO);

  response.status(201)
    .json(group);
};

export const addUsersToGroup = async (request, response) => {
  const groupId = request.params.id;
  const { userIds } = request.body;

  const isUsersAdded = await GroupService.addUsersToGroup(groupId, userIds);

  if (isUsersAdded) {
    response.status(200)
      .send({ message: 'Users are added to group' });
  } else {
    response.status(400)
      .send({ message: 'Users are not added to group.' });
  }
};

export const getGroupById = async (request, response) => {
  const group = await GroupService.getById(request.params.id);

  if (!group) {
    response.status(404)
      .send({ message: 'Group is not found.' });
  } else {
    response.status(200)
      .json(group);
  }
};

export const getGroups = async (request, response) => {
  const groups = await GroupService.getAll();
  response.status(200)
    .send({ groups });
};

export const updateGroup = async (request, response) => {
  const groupId = request.params.id;

  const group = await GroupService.getById(groupId);

  if (group) {
    const updatedGroup = await GroupService.update(groupId, request.body);

    response.status(200)
      .send(updatedGroup);
  } else {
    response.status(404)
      .send({ message: 'Group is not found.' });
  }
};

export const deleteGroup = async (request, response) => {
  const groupId = request.params.id;

  const group = await GroupService.getById(groupId);

  if (group) {
    await GroupService.delete(request.params.id);

    response.status(200)
      .send({ message: 'Group has been removed.' });
  } else {
    response.status(404)
      .send({ message: 'Group is not found.' });
  }
};
