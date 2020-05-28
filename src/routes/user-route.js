import userController from '../controllers/user-controller';
import express from 'express';
import schema from '../schemas/user-post-schema';
import {validateSchema} from '../middlewares/validatePayload';

const userRouter = express.Router();

userRouter.post('/', validateSchema(schema), userController.addUser);
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', validateSchema(schema), userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;