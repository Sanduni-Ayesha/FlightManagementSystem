import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Route} from "../../model/Route";

@Injectable({
  providedIn: 'root'
})
export class RouteService{
  private baseUrl = "http://localhost:8080/route";
  constructor(private http:HttpClient) { }

  public getAllRoutes(departureAirport:string,arrivalAirport:string):Observable<Route[]>{
    return this.http.post<Route[]>(`${this.baseUrl}/get-route`,{
      "departureAirport": departureAirport,
      "arrivalAirport": arrivalAirport
    })
  }

  public deleteRoute(id:number){
    return this.http.delete(`${this.baseUrl}/delete-route?id=${id.toString()}`,{observe:'response'})
  }
  public updateRoute(route:Route){
    return this.http.put<any>(`${this.baseUrl}/update-route`,route,{observe:'response'})
  }
  public addRoute(route:Route){
    return this.http.post<any>(`${this.baseUrl}/add-route`,route,{observe:'response'})
  }

}
