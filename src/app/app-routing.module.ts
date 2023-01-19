import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightScreenComponent } from './component/Flight/flight-screen/flight-screen.component';
import {RouteScreenComponent} from "./component/Route/route-screen/route-screen.component";

const routes: Routes = [
  {path: 'flight', component: FlightScreenComponent},
  {path: 'route', component: RouteScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
