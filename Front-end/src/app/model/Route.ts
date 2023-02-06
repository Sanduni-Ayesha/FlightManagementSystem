export class Route{
    id:number;
    arrivalAirport: String ;
    departureAirport: String;
    mileage: number;
    duration: number;
    version:number;
    createdTime:Date;
    lastUpdatedTime:Date;

    constructor(id: number,
                arrivalAirport: String,
                departureAirport: String,
                mileage: number,
                duration: number,
                version:number,
                createdTime:Date,
                lastUpdatedTime:Date
    ) {
        this.id = id;
        this.arrivalAirport = arrivalAirport;
        this.departureAirport = departureAirport;
        this.mileage = mileage;
        this.duration = duration;
        this.version = version;
        this.createdTime = createdTime;
        this.lastUpdatedTime= lastUpdatedTime
    }

}