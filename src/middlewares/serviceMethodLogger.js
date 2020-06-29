import logger from '../loggers/logger';

const serviceMethodLogger = (req, res, next) => {
  logger.log('Request Type:', req.method);
  logger.log('URL: ', req.originalUrl);
  logger.log('Request parameters: ', req.params);
  next();
};

const errorHandler = (err, req, res, next) => {
  const {
    originalUrl, method, headers, query, params, body, id,
  } = req;
  logger.log('error', `HTTP ${method} ${originalUrl}`, {
    requestId: id,
    headers,
    query,
    params,
    body,
  });

  res.status(500);
  res.send({ message: err.message });

  next(err);
};

export { serviceMethodLogger, errorHandler };
