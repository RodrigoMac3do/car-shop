import MotorcycleODM from '../Models/MotorcycleORM';
import Motorcycle from '../Domains/Motorcycle';
import HttpException from '../Utils/http.exception';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class CarService {
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
}
