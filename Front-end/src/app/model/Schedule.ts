export class Schedule {
    startDate: Date;
    endDate: Date;
    departureAirport: string;
    arrivalAirport: string;
    flightNo: string;
    departureTime: Date;
    arrivalTime: Date;
    createdTime: Date;
    weekdays: string[];

    constructor(startDate: Date,
                endDate: Date,
                departureAirport: string,
                arrivalAirport: string,
                flightNo: string,
                departureTime: Date,
                arrivalTime: Date,
                createdTime: Date,
                days: string[]) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.flightNo = flightNo;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.createdTime = createdTime;
        this.weekdays = days;
    }
}