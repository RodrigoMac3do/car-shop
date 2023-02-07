import express from 'express';
// import 'express-async-errors';
import HttpError from './Middlewares/http.error.middleware';
import routes from './Routes/router';

const app = express();

app.use(express.json());

app.use(routes);

app.use(HttpError.handle);

export default app;
