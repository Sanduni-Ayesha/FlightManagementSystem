export class SearchFlight {
    departureAirport: string;
    arrivalAirport: string;
    flightNo: string;
    departureTime: Date;
    arrivalTime: Date;

    constructor(formValues: Partial<any>, departureAirport: string, arrivalAirport: string) {
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.flightNo = formValues['flightNo'];
        this.departureTime = formValues['departureTime'];
        this.arrivalTime = formValues['arrivalTime']
    }
}