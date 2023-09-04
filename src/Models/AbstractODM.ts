import { Model, model, models, Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public create = async (auto: ICar | IMotorcycle) =>
    this.model.create({ ...auto });

  public findAll = async () => this.model.find();

  public findById = async (id: string) => this.model.findById(id);

  public updateById = async (id: string, auto: ICar | IMotorcycle) =>
    this.model.findByIdAndUpdate(id, auto);

  public deleteById = async (id: string) => this.model.findByIdAndRemove(id);
}
