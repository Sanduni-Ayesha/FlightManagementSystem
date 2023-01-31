export class Flight {
  private _id: number;
  private _departureAirport: string;
  private _arrivalAirport: string;
  private _flightNo: string;
  private _departureTime: Date;
  private _arrivalTime: Date;

  constructor(
    id: number,
    departureAirport: string,
    arrivalAirport: string,
    flightNo: string,
    departureTime: Date,
    arrivalTime: Date
  ) {
    this._id = id;
    this._departureAirport = departureAirport;
    this._arrivalAirport = arrivalAirport;
    this._flightNo = flightNo;
    this._departureTime = departureTime;
    this._arrivalTime = arrivalTime;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get departureAirport(): string {
    return this._departureAirport;
  }

  set departureAirport(value: string) {
    this._departureAirport = value;
  }

  get arrivalAirport(): string {
    return this._arrivalAirport;
  }

  set arrivalAirport(value: string) {
    this._arrivalAirport = value;
  }

  get flightNo(): string {
    return this._flightNo;
  }

  set flightNo(value: string) {
    this._flightNo = value;
  }

  get departureTime(): Date {
    return this._departureTime;
  }

  set departureTime(value: Date) {
    this._departureTime = value;
  }

  get arrivalTime(): Date {
    return this._arrivalTime;
  }

  set arrivalTime(value: Date) {
    this._arrivalTime = value;
  }
}
