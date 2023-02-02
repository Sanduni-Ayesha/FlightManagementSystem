export class Route{
    id:number;
    arrivalAirport: String ;
    departureAirport: String;
    mileage: number;
    duration: number;


    constructor(id: number, arrivalAirport: String, departureAirport: String, mileage: number, duration: number) {
        this.id = id;
        this.arrivalAirport = arrivalAirport;
        this.departureAirport = departureAirport;
        this.mileage = mileage;
        this.duration = duration;
    }

}