import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import HttpException from '../Utils/HttpException';

export default class CarService {
  private model: CarODM;

  constructor() {
    this.model = new CarODM();
  }

  private createCarDomain(car: ICar) {
    if (car) return new Car(car);

    return null;
  }

  public create = async (car: ICar) => {
    const newCar = await this.model.create(car);

    return this.createCarDomain(newCar);
  };

  public findAll = async () => {
    const car = await this.model.findAll();

    const cars = car.map((auto) => this.createCarDomain(auto));

    return cars;
  };

  public findById = async (id: string) => {
    const car = await this.model.findById(id);

    if (!car) throw new HttpException(404, 'Car not found');

    return this.createCarDomain(car);
  };

  public updateById = async (id: string, car: ICar) => {
    await this.findById(id);

    await this.model.updateById(id, car);

    return this.createCarDomain({ id, ...car });
  };

  public deleteById = async (id: string) => {
    await this.findById(id);

    await this.model.deleteById(id);
  };
}
