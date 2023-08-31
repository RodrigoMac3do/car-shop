import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import { carSchema } from '../Services/Validations/Schema';
import ValidateSchema from '../Services/Validations/ValidateSchema';
import ValidateObjectId from '../Utils/ValidateObjectId';

export default class CarsController {
  private service: CarService;
  private validateObjectId = new ValidateObjectId();
  private validateSchema = new ValidateSchema();

  constructor() {
    this.service = new CarService();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const car: ICar = req.body;

    await this.validateSchema.validate(carSchema, car);

    try {
      const newCar = await this.service.create(car);

      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  };

  public findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const cars = await this.service.findAll();

      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      this.validateObjectId.validate(id);
      const car = await this.service.findById(id);

      return res.status(200).json(car);
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
    const car: ICar = req.body;

    await this.validateSchema.validate(carSchema, car);

    try {
      this.validateObjectId.validate(id);

      const carUpdated = await this.service.updateById(id, car);

      return res.status(200).json(carUpdated);
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
