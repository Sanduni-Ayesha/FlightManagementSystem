import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Route} from "../../model/Route";

@Injectable({
  providedIn: 'root'
})
export class RouteService{
  private baseUrl = "http://localhost:8080";
  constructor(private http:HttpClient) { }

  public getAllRoutes():Observable<Route[]>{
    return this.http.get<Route[]>(`${this.baseUrl}/route/get_route`)
  }
}
