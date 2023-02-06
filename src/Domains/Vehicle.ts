import IVehicle from '../Interfaces/IVehicle';

export default class Vehicle {
  protected id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | undefined;
  protected buyValue: number;

  constructor(auto: IVehicle) {
    this.id = auto.id;
    this.model = auto.model;
    this.year = auto.year;
    this.color = auto.color;
    this.status = auto.status;
    this.buyValue = auto.buyValue;
  }

  public setModel(model: string) {
    this.model = model;
  }

  public setYear(year: number) {
    this.year = year;
  }

  public setColor(color: string) {
    this.color = color;
  }

  public setStatus(status: boolean) {
    this.status = status;
  }

  public setBuyValue(buyValue: number) {
    this.buyValue = buyValue;
  }

  public getModel() {
    return this.model;
  }

  public getYear() {
    return this.year;
  }

  public getColor() {
    return this.color;
  }

  public getStatus() {
    return this.status;
  }

  public getBuyValue() {
    return this.buyValue;
  }
}
