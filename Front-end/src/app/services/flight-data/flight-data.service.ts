import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flight} from "../../model/Flight";

@Injectable({
  providedIn: 'root',
})
export class FlightDataService {
  private baseUrl = "http://localhost:8080";
  constructor(private http:HttpClient) { }

  public getAllFlights():Observable<Flight[]>{
    return this.http.get<Flight[]>(`${this.baseUrl}/flight/getFlights`)
  }

  public deleteFlight(id: number){
    return this.http.delete(`${this.baseUrl}/flight/getFlights/${id}`)
  }

  public addFlight(flight: Flight){
    return this.http.post(`${this.baseUrl}/flight/addFlight`, flight);
  }

  public  updateFlight(flight: Flight){
    return this.http.put(`${this.baseUrl}/flight/updateFlight`, flight)
  }
}
