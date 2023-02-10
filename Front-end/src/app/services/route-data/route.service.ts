import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Route} from "../../model/Route";

@Injectable({
  providedIn: 'root'
})
export class RouteService{
  private baseUrl = "http://localhost:8080/route";
  constructor(private http:HttpClient) { }

  public getAllRoutes(departureAirport:string,arrivalAirport:string):Observable<Route[]>{
    return this.http.get<Route[]>(`${this.baseUrl}/get-route?departureAirport=${departureAirport}&arrivalAirport=${arrivalAirport}`)
  }

  public deleteRoute(id:number){
    return this.http.delete(`${this.baseUrl}/delete-route?id=${id.toString()}`)
  }
  public updateRoute(route:Route):Observable<Route>{
    return this.http.put<Route>(`${this.baseUrl}/update-route`,route)
  }
  public addRoute(route:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/add-route`,route)
  }

}
