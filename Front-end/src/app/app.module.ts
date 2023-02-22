import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddRouteFormComponent} from './component/Route/add-route-form/add-route-form.component';

import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';

//Flight screen
import {FlightScreenComponent} from './component/Flight/flight-screen/flight-screen.component';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';

import {AddFlightFormComponent} from './component/Flight/add-flight-form/add-flight-form.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {NavBarComponent} from './component/nav-bar/nav-bar.component';

import {RouteScreenComponent} from './component/Route/route-screen/route-screen.component';
import {
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import {ScheduleFlightFormComponent} from './component/Flight/schedule-flight-form/schedule-flight-form.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AlertModalComponent} from './component/Alert/alert-modal/alert-modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        AppComponent,
        FlightScreenComponent,
        AddRouteFormComponent,
        RouteScreenComponent,
        AddFlightFormComponent,
        NavBarComponent,
        ScheduleFlightFormComponent,
        AlertModalComponent,
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
        MatIconModule,
        MatDialogModule,
        MatToolbarModule,
        MatTabsModule,
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSnackBarModule,
    ],
    providers: [
        {
            provide: MatDialogRef,
            useValue: {},
        },
    ],

    bootstrap: [AppComponent],
})
export class AppModule {
}
