import Joi from 'joi';
import HttpException from '../../Utils/HttpException';
import { mapStatusCode } from './StatusCode';

export default class ValidateSchema {
  public validate = (schema: Joi.Schema, data: object) => {
    const { error, value } = schema.validate(data);

    if (error) {
      throw new HttpException(mapStatusCode(error.message), error.message);
    }

    return value;
  };
}
