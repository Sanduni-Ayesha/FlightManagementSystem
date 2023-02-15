export class Flight {
    id: number;
    departureAirport: string;
    arrivalAirport: string;
    flightNo: string;
    departureTime: string;
    arrivalTime: string;
    createdTime: string;
    lastUpdatedTime: string;
    status: string;
    version: number;


    constructor(
        id: number,
        departureAirport: string,
        arrivalAirport: string,
        flightNo: string,
        departureTime: string,
        arrivalTime: string,
        createdTime: string,
        lastUpdatedTime: string,
        status: string,
        version: number
    ) {
        this.id = id;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.flightNo = flightNo;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.createdTime = createdTime;
        this.lastUpdatedTime = lastUpdatedTime;
        this.status = status;
        this.version = version;
    }
}
