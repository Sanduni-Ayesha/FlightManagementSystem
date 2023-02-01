export class Flight {
  id: number;
  departureAirport: string;
  arrivalAirport: string;
  flightNo: string;
  departureTime: string;
  arrivalTime: string;

  constructor(
    id: number,
    departureAirport: string,
    arrivalAirport: string,
    flightNo: string,
    departureTime: string,
    arrivalTime: string
  ) {
    this.id = id;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.flightNo = flightNo;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
  }
}
