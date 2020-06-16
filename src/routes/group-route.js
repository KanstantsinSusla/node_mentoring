import express from 'express';
import {
  addGroup, addUsersToGroup, getGroups, getGroupById, updateGroup, deleteGroup,
} from '../controllers/group-controller';
import schema from '../schemas/group-post-schema';
import validateSchema from '../middlewares/validatePayload';

const groupRouter = express.Router();

groupRouter.post('/', validateSchema(schema), addGroup);
groupRouter.post('/add-users-to-group', addUsersToGroup);
groupRouter.get('/', getGroups);
groupRouter.get('/:id', getGroupById);
groupRouter.put('/:id', validateSchema(schema), updateGroup);
groupRouter.delete('/:id', deleteGroup);

export default groupRouter;
