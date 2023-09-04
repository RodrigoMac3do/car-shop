import IVehicle from '../Interfaces/IVehicle';

export default class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;

  constructor(auto: IVehicle) {
    this.id = auto.id;
    this.model = auto.model;
    this.year = auto.year;
    this.color = auto.color;
    this.status = auto.status;
    this.buyValue = auto.buyValue;
  }
}
