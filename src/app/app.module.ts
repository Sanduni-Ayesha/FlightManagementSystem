import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddRouteFormComponent } from './component/Router/add-route-form/add-route-form.component';

import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

//Flight screen
import { FlightScreenComponent } from './component/Flight/flight-screen/flight-screen.component';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

//Route table
import{CreateRouteTableComponent} from "./component/Router/create-route-table/create-route-table.component";
@NgModule({

  declarations: [
    AppComponent,
    FlightScreenComponent,
    AddRouteFormComponent,
    CreateRouteTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
