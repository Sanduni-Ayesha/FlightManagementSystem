export class Flight {
  private id: number;
  private departureAirport: string;
  private arrivalAirport: string;
  private flightNo: string;
  private departureTime: Date;
  private arrivalTime: Date;

  constructor(
    id: number,
    departureAirport: string,
    arrivalAirport: string,
    flightNo: string,
    departureTime: Date,
    arrivalTime: Date
  ) {
    this.id = id;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.flightNo = flightNo;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
  }
}
