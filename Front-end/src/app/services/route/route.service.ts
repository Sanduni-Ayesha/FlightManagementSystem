import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService implements OnInit{
  route :[]
  constructor() { }

  ngOnInit(): void {
  }
}
