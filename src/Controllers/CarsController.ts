import { NextFunction, Request, RequestHandler, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import { carSchema } from '../Services/Validations/Schema';
import ValidateObjectId from '../Utils/ValidateObjectId';
import ValidateSchema from '../Services/Validations/ValidateSchema';

export default class CarsController {
  private service: CarService;
  private validateObjectId = new ValidateObjectId();

  constructor() {
    this.service = new CarService();
  }

  public create: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const car: ICar = req.body;

    ValidateSchema.validate(carSchema, car);

    try {
      const newCar = await this.service.create(car);

      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  };

  public findAll: RequestHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const cars = await this.service.findAll();

      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  };

  public findById: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    try {
      this.validateObjectId.validate(id);
      const car = await this.service.findById(id);

      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  };

  public updateById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car: ICar = req.body;

    this.validateObjectId.validate(id);

    ValidateSchema.validate(carSchema, car);

    const carUpdated = await this.service.updateById(id, car);

    res.status(200).json(carUpdated);
  };

  public deleteById: RequestHandler = async (
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
