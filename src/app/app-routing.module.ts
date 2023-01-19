import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightScreenComponent } from './component/Flight/flight-screen/flight-screen.component';
import {CreateRouteTableComponent} from "./component/Router/create-route-table/create-route-table.component";

const routes: Routes = [
  {path: 'flight', component: FlightScreenComponent},
  {path: 'route', component: CreateRouteTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
