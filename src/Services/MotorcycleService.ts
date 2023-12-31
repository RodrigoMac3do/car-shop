import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import HttpException from '../Utils/HttpException';

export default class MotorcycleService {
  private model: MotorcycleODM;

  constructor() {
    this.model = new MotorcycleODM();
  }

  private createBikeDomain(bike: IMotorcycle) {
    if (bike) return new Motorcycle(bike);

    return null;
  }

  public create = async (bike: IMotorcycle) => {
    const newCar = await this.model.create(bike);

    return this.createBikeDomain(newCar);
  };

  public findAll = async () => {
    const bike = await this.model.findAll();

    const cars = bike.map((auto) => this.createBikeDomain(auto));

    return cars;
  };

  public findById = async (id: string) => {
    const bike = await this.model.findById(id);

    if (!bike) throw new HttpException(404, 'Motorcycle not found');

    return this.createBikeDomain(bike);
  };

  public updateById = async (id: string, bike: IMotorcycle) => {
    await this.findById(id);

    await this.model.updateById(id, bike);

    return this.createBikeDomain({ id, ...bike });
  };

  public deleteById = async (id: string) => {
    await this.findById(id);

    await this.model.deleteById(id);
  };
}
