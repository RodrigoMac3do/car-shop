import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';

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
    console.log(newCar);

    return this.createCarDomain(newCar);
  };
}
