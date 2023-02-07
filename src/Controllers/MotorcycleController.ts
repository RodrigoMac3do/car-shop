import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import ValidateObjectId from '../Utils/ValidateObjectId';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;
  private validateObjectId = new ValidateObjectId();

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public create = async () => {
    const bike: IMotorcycle = { ...this.req.body };

    try {
      const newBike = await this.service.create(bike);

      return this.res.status(201).json(newBike);
    } catch (error) {
      this.next(error);
    }
  };

  public findAll = async () => {
    try {
      const bikes = await this.service.findAll();

      return this.res.status(200).json(bikes);
    } catch (error) {
      this.next(error);
    }
  };

  public findById = async () => {
    const { id } = this.req.params;

    this.validateObjectId.validate(id);

    try {
      const bike = await this.service.findById(id);

      return this.res.status(200).json(bike);
    } catch (error) {
      this.next(error);
    }
  };
}
