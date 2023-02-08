import express from 'express';
import 'express-async-errors';
import HttpError from './Middlewares/HttpError.middleware';
import Routes from './Routes/Router';

const app = express();

app.use(express.json());

app.use(Routes);

app.use(HttpError.handle);

export default app;
