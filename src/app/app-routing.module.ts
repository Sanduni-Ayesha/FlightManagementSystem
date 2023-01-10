import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightScreenComponent } from './flight-screen/flight-screen.component';

const routes: Routes = [
  {path: 'routes', component: FlightScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
