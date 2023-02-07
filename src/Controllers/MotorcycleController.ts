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
}
