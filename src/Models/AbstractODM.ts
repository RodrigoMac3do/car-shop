import { Model, model, models, Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public create = async (car: ICar): Promise<T> => this.model.create({ ...car });

  public findAll = async (): Promise<T[]> => this.model.find();

  public findById = async (id: string): Promise<T | null> =>
    this.model.findById(id);

  public updateById = async (
    id: string,
    car: ICar,
  ): Promise<T | null> => {
    const carUpdated = await this.model.findByIdAndUpdate(id, car);

    return carUpdated;
  };
}
