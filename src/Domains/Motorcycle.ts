import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(bike: IMotorcycle) {
    super(bike);

    this.category = bike.category;
    this.engineCapacity = bike.engineCapacity;
  }

  public setCategory(category: string) {
    this.category = category;
  }

  public setEngineCapacity(engineCapacity: number) {
    this.engineCapacity = engineCapacity;
  }

  public getCategory() {
    return this.category;
  }

  public getEngineCapacity() {
    return this.engineCapacity;
  }
}
