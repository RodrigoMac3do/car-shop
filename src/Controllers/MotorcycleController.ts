import { Request, RequestHandler, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import ValidateObjectId from '../Utils/ValidateObjectId';
import IMotorcycle from '../Interfaces/IMotorcycle';
import ValidateSchema from '../Services/Validations/ValidateSchema';
import { motorcycleSchema } from '../Services/Validations/Schema';

export default class MotorcycleController {
  private service: MotorcycleService;
  private validateObjectId = new ValidateObjectId();

  constructor() {
    this.service = new MotorcycleService();
  }

  public create: RequestHandler = async (req: Request, res: Response) => {
    const bike: IMotorcycle = req.body;

    ValidateSchema.validate(motorcycleSchema, bike);

    const newBike = await this.service.create(bike);

    res.status(201).json(newBike);
  };

  public findAll: RequestHandler = async (_req: Request, res: Response) => {
    const bikes = await this.service.findAll();

    res.status(200).json(bikes);
  };

  public findById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.validateObjectId.validate(id);

    const bike = await this.service.findById(id);

    res.status(200).json(bike);
  };

  public updateById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const bike: IMotorcycle = req.body;

    this.validateObjectId.validate(id);

    ValidateSchema.validate(motorcycleSchema, bike);

    const bikeUpdated = await this.service.updateById(id, bike);

    res.status(200).json(bikeUpdated);
  };

  public deleteById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.validateObjectId.validate(id);

    await this.service.deleteById(id);

    res.sendStatus(204);
  };
}
