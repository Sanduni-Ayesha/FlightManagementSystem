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

  public getAllRoutes():Observable<Route[]>{
    return this.http.get<Route[]>(`${this.baseUrl}/get_route`)
  }

  public deleteRoute(id:number){
    return this.http.delete(`${this.baseUrl}/delete-route?id=${id.toString()}`)
  }
}
