import express from 'express';
import 'express-async-errors';
import userRoutes from './routes/user-route';
import database from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

database.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json());
app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  res.status(500);
  res.send({ message: err.message });

  next(err);
});


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
