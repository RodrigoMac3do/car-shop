import { isValidObjectId } from 'mongoose';
import HttpException from './http.exception';

export default class ValidateObjectId {
  public validate(id: string): void {
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');
  }
}
