export class Route{
    private _id:number;
    private _arrivalAirport: String ;
    private _departureAirport: String;
    private _mileage: number;
    private _duration: number;


    constructor(id: number, arrivalAirport: String, departureAirport: String, mileage: number, duration: number) {
        this._id = id;
        this._arrivalAirport = arrivalAirport;
        this._departureAirport = departureAirport;
        this._mileage = mileage;
        this._duration = duration;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get arrivalAirport(): String {
        return this._arrivalAirport;
    }

    set arrivalAirport(value: String) {
        this._arrivalAirport = value;
    }

    get departureAirport(): String {
        return this._departureAirport;
    }

    set departureAirport(value: String) {
        this._departureAirport = value;
    }

    get mileage(): number {
        return this._mileage;
    }

    set mileage(value: number) {
        this._mileage = value;
    }

    get duration(): number {
        return this._duration;
    }

    set duration(value: number) {
        this._duration = value;
    }
}