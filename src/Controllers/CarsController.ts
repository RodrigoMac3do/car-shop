import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import ValidateObjectId from '../Utils/ValidateObjectId';

export default class CarsController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;
  private validateObjectId = new ValidateObjectId();

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public create = async () => {
    const car: ICar = { ...this.req.body };

    try {
      const newCar = await this.service.create(car);

      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  };

  public findAll = async () => {
    try {
      const cars = await this.service.findAll();

      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  };

  public findById = async () => {
    const { id } = this.req.params;

    // this.validateObjectId.validate(id);

    try {
      this.validateObjectId.validate(id);
      const car = await this.service.findById(id);

      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  };

  public updateById = async () => {
    const { id } = this.req.params;
    const car = this.req.body;

    // this.validateObjectId.validate(id);

    try {
      this.validateObjectId.validate(id);

      const carUpdated = await this.service.updateById(id, car);

      return this.res.status(200).json(carUpdated);
    } catch (error) {
      this.next(error);
    }
  };

  public deleteById = async () => {
    const { id } = this.req.params;

    // this.validateObjectId.validate(id);

    try {
      this.validateObjectId.validate(id);

      await this.service.deleteById(id);

      return this.res.sendStatus(204);
    } catch (error) {
      this.next(error);
    }
  };
}
