import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flight} from "../../model/Flight";
import {Schedule} from "../../model/Schedule";
import {SearchFlight} from "../../model/SearchFlight";

@Injectable({
    providedIn: 'root',
})
export class FlightDataService {
    private baseUrl = "http://localhost:8080";

    constructor(private http: HttpClient) {
    }

    public getAllFlights(searchFlight: SearchFlight): Observable<Flight[]> {
        return this.http.post<Flight[]>(`${this.baseUrl}/flight/getFlights`, searchFlight)
    }

    public deleteFlight(id: number) {
        return this.http.delete(`${this.baseUrl}/flight/deleteFlight/${id}`, {observe: "response"})
    }

    public addFlight(flight: Flight) {
        return this.http.post(`${this.baseUrl}/flight/addFlight`, flight, {observe: "response"});
    }

    public updateFlight(flight: Flight) {
        return this.http.put(`${this.baseUrl}/flight/updateFlight`, flight, {observe: "response"})
    }

    public scheduleFlight(schedule: Schedule): Observable<HttpResponse<Flight>> {
        return this.http.post<Flight>(`${this.baseUrl}/flight/schedule-flight`, schedule, {observe: "response"})
    }
}
