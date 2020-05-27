import userController from '../controller/user.controller.js'
import express from 'express'
import schema from './user.post.schema'

const userRouter = express.Router();

userRouter.post('/add', validateSchema(schema), userController.addUser);
userRouter.get('/all', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.get('/:login/:limit', userController.getAutoSuggestUsers);
userRouter.put('/:id', validateSchema(schema), userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);


function errorResponse(schemaErrors) {
    const errors = schemaErrors.map((error) => {
        let {path, message} = error;
        return {path, message};
    });

    return {
        status: 'failed',
        errors,
    };
}

function validateSchema(schema) {
    return (request, response, next) => {
        const {error} = schema.validate(request.body, {
            abortEarly: false,
            allowUnknown: false,
        });

        if (error !== undefined && error.isJoi) {
            response.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    }
}

module.exports = userRouter;