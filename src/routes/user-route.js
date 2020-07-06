import express from 'express';
import {
  userLogin, addUser, getUsers, getUserById, updateUser, deleteUser,
} from '../controllers/user-controller';
import schema from '../schemas/user-post-schema';
import validateSchema from '../middlewares/validatePayload';

const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.post('/', validateSchema(schema), addUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', validateSchema(schema), updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
