export class Schedule {
    startDate: Date;
    endDate: Date;
    departureAirport: string;
    arrivalAirport: string;
    flightNo: string;
    departureTime: Date;
    arrivalTime: Date;
    weekdays: string[];

    constructor(formValues: Partial<any>, departure: string, arrival: string, days: string[]) {
        this.startDate = formValues['startDate'];
        this.endDate = formValues['endDate'];
        this.departureAirport = departure;
        this.arrivalAirport = arrival;
        this.flightNo = formValues['flightNo'];
        this.departureTime = formValues['departureTime'];
        this.arrivalTime = formValues['arrivalTime'];
        this.weekdays = days;
    }
}