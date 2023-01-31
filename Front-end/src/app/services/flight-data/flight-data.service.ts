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
}
