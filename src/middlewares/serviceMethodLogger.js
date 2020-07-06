import logger from '../loggers/logger';

const serviceMethodLogger = (req, res, next) => {
  const { method, originalUrl, params } = req;
  logger.log('info', { method });
  logger.log('info', { originalUrl });
  logger.log('info', { params });
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
