import 'dotenv/config';
import { info, error } from 'console';
import app from './app';
import connectToDatabase from './Models/Connection';

const PORT = process.env.PORT || 3001;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => info(`Running server on port: ${PORT}`));
  })
  .catch((err) => {
    info('Connection with database generated an error:\r\n');
    error(err);
    info('\r\nServer initialization cancelled');
    process.exit(0);
  });
