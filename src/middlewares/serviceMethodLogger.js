const serviceMethodLogger = (req, res, next) => {
  console.log('Request Type:', req.method);
  console.log('URL: ', req.originalUrl);
  console.log('Request parameters: ', req.params);
  next();
};

export default serviceMethodLogger;
