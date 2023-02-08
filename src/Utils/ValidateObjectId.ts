import { isValidObjectId } from 'mongoose';

export default class ValidateObjectId {
  public validate = (id: string): void => {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
  };
}
