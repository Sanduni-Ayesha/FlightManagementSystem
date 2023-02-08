import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airport} from "../../model/Airport";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private baseUrl = "http://localhost:8080/airport";
  constructor(private http:HttpClient) { }
  public getAllAirports():Observable<Airport[]>{
    return this.http.get<Airport[]>(`${this.baseUrl}/get-airport`)
  }


}
