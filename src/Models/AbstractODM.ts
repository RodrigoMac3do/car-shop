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

  public create = async (car: ICar) => this.model.create({ ...car });

  public findAll = async () => this.model.find();

  public findById = async (id: string) => this.model.findById(id);

  public updateById = async (id: string, car: ICar) => {
    await this.model.findByIdAndUpdate(id, car);
  };

  public deleteById = async (id: string) => this.model.findByIdAndRemove(id);
}
