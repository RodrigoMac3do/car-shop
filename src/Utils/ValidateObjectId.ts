import { isValidObjectId } from 'mongoose';
import HttpException from './HttpException';

export default class ValidateObjectId {
  public validate = (id: string): Error | void => {
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');
  };
}
