exports.validateSchema = (schema) => {
    return (request, response, next) => {
        const { error } = schema.validate(request.body, {
            abortEarly: false,
            allowUnknown: false,
        });

        if (error) {
            response.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    };
};

const errorResponse = (schemaErrors) => {
    const errors = schemaErrors.map((error) => ({
        path: error.path,
        message: error.message,
    }));

    return {
        status: 'failed',
        errors,
    };
};
