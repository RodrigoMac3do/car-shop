import { ErrorRequestHandler } from 'express';
import HttpException from '../Utils/http.exception';

export default class HttpError {
  public static handle: ErrorRequestHandler = (err, _req, res, next) => {
    const { status, message } = err as HttpException;

    if (message.includes('not found')) {
      res.status(404).json({ message });
    }

    if (message.includes('Invalid')) {
      res.status(422).json({ message });
    }

    res.status(status || 500).json({ message });

    next();
  };
}
