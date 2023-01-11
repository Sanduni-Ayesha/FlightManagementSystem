import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightScreenComponent } from './flight-screen/flight-screen.component';
import {CreateRouteTableComponent} from "./create-route-table/create-route-table.component";
import {AddRouteFormComponent} from "./add-route-form/add-route-form.component";

const routes: Routes = [
  {path: 'flight', component: FlightScreenComponent},
  {path: 'route', component: CreateRouteTableComponent},
  {path: 'route/addRoute', component: AddRouteFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
