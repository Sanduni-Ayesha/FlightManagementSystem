import {Injectable, OnInit} from '@angular/core';
import {Routes} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouteService{
  private baseUrl = "http://localhost:8080";
  constructor(private http:HttpClient) { }

  public getAllRoutes():Observable<Routes[]>{
    return this.http.get<Routes[]>(`${this.baseUrl}/route/get_route`)
  }
}
