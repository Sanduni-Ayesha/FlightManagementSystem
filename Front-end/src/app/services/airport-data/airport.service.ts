import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airport} from "../../model/Airport";

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private baseUrl = "http://localhost:8080/airport";
  constructor(private http:HttpClient) { }
  public getAllAirports():Observable<String[]>{
    return this.http.get<String[]>(`${this.baseUrl}/get-airport`)
  }
}
