import { Request, RequestHandler, Response } from 'express';
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

  public create: RequestHandler = async (req: Request, res: Response) => {
    const car: ICar = req.body;

    ValidateSchema.validate(carSchema, car);

    const newCar = await this.service.create(car);

    res.status(201).json(newCar);
  };

  public findAll: RequestHandler = async (_req: Request, res: Response) => {
    const cars = await this.service.findAll();

    res.status(200).json(cars);
  };

  public findById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.validateObjectId.validate(id);
    const car = await this.service.findById(id);

    res.status(200).json(car);
  };

  public updateById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car: ICar = req.body;

    this.validateObjectId.validate(id);

    ValidateSchema.validate(carSchema, car);

    const carUpdated = await this.service.updateById(id, car);

    res.status(200).json(carUpdated);
  };

  public deleteById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.validateObjectId.validate(id);

    await this.service.deleteById(id);

    res.sendStatus(204);
  };
}
