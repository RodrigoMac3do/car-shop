import Joi from 'joi';
import ICar from '../Interfaces/ICar';
import IMotorcycle from '../Interfaces/IMotorcycle';

const carSchema: Joi.Schema = Joi.object<ICar>({
  id: Joi.string(),
  model: Joi.string().required(),
  year: Joi.number().required(),
  color: Joi.string().required(),
  status: Joi.boolean(),
  buyValue: Joi.number().required(),
  doorsQty: Joi.number().required(),
  seatsQty: Joi.number().required(),
}).strict(true);

const motorcycleSchema: Joi.Schema = Joi.object<IMotorcycle>({
  id: Joi.string(),
  model: Joi.string().required(),
  year: Joi.number().required(),
  color: Joi.string().required(),
  status: Joi.boolean(),
  buyValue: Joi.number().required(),
  category: Joi.string().required(),
  engineCapacity: Joi.number().required(),
}).strict(true);

export { carSchema, motorcycleSchema };
