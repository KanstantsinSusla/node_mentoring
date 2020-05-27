import express from 'express'
import userRoutes from '../src/route/user.route'

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.listen(3000, function () {
    console.log('listening on 3000');
})