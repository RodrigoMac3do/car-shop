import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import ValidateObjectId from '../Utils/ValidateObjectId';
import IMotorcycle from '../Interfaces/IMotorcycle';
import ValidateSchema from '../Services/Validations/ValidateSchema';
import { motorcycleSchema } from '../Services/Validations/Schema';

export default class MotorcycleController {
  private service: MotorcycleService;
  private validateObjectId = new ValidateObjectId();
  private validateSchema = new ValidateSchema();

  constructor() {
    this.service = new MotorcycleService();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const bike: IMotorcycle = req.body;

    await this.validateSchema.validate(motorcycleSchema, bike);

    try {
      const newBike = await this.service.create(bike);

      return res.status(201).json(newBike);
    } catch (error) {
      next(error);
    }
  };

  public findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const bikes = await this.service.findAll();

      return res.status(200).json(bikes);
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      this.validateObjectId.validate(id);

      const bike = await this.service.findById(id);

      return res.status(200).json(bike);
    } catch (error) {
      next(error);
    }
  };

  public updateById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const bike: IMotorcycle = req.body;

    await this.validateSchema.validate(motorcycleSchema, bike);

    try {
      this.validateObjectId.validate(id);

      const bikeUpdated = await this.service.updateById(id, bike);

      return res.status(200).json(bikeUpdated);
    } catch (error) {
      next(error);
    }
  };

  public deleteById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    try {
      this.validateObjectId.validate(id);

      await this.service.deleteById(id);

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
