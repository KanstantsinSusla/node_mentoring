import express from 'express';
import 'express-async-errors';
import userRoutes from './routes/user-route';
import groupRoutes from './routes/group-route';
import database from './config/database';
import { serviceMethodLogger, errorHandler } from './middlewares/serviceMethodLogger';
import logger from './loggers/winstonLogger';

const app = express();
const PORT = process.env.PORT || 3000;

database.authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });

app.use(express.json());
app.use(serviceMethodLogger);
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Listening on ${PORT}`);
});

process
  .on('unhandledRejection', (reason) => {
    logger.error(`Unhandled Rejection at Promise ${reason}`);
  })
  .on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception thrown ${err}`);

    server.close(() => {
      database.close();
    });

    process.exit(1);
  });
