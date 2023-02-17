import {Component, Inject, OnInit} from '@angular/core';
import {Airport} from "../../../model/Airport";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {airportValidator} from "../../../shared/airport.validator";
import {dateValidator} from "../../../shared/date.validator";
import {futureDateValidator} from "../../../shared/futureDate.validator";
import {MatDialog} from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {DIALOG_DATA} from "@angular/cdk/dialog";

@Component({
  selector: 'app-schedule-flight-form',
  templateUrl: './schedule-flight-form.component.html',
  styleUrls: ['./schedule-flight-form.component.scss']
})
export class ScheduleFlightFormComponent implements OnInit{
  filteredDepartures: Airport[] = [];
  filteredArrivals: Airport[] = [];
  scheduleForm = new FormGroup(
      {
        startDate: new FormControl('',[
            Validators.required,
        ]),
        endDate: new FormControl('',[
          Validators.required,
        ]),
        departureAirport: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[^0-9]*$/),
        ]),
        arrivalAirport: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[^0-9]*$/),
        ]),
        flightNo: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]{2}[0-9]{4}$/),
        ]),
        departureTime: new FormControl('', [
          Validators.required,
        ]),
        arrivalTime: new FormControl('', [
          Validators.required,
        ]),
          monday: new FormControl(''),
          tuesday: new FormControl(''),
          wednesday: new FormControl(''),
          thursday: new FormControl(''),
          friday: new FormControl(''),
          saturday: new FormControl(''),
          sunday: new FormControl(''),
      },
      {validators: [airportValidator]}
  );

  constructor(
      public dialog: MatDialog,
      @Inject(DIALOG_DATA) public data: any,
  ) {
  }
  ngOnInit() {
    this.scheduleForm.controls['departureAirport'].valueChanges
        .pipe(map((value) => this.filterAirports(value || '')))
        .subscribe((departures) => {
          this.filteredDepartures = departures;
        });
    this.scheduleForm.controls['arrivalAirport'].valueChanges
        .pipe(map((value) => this.filterAirports(value || '')))
        .subscribe((arrivals) => {
          this.filteredArrivals = arrivals;
        });
  }

  private filterAirports(value: string): Airport[] {
    const filterValue = value.toLowerCase();
    if (this.data.airports) {
      return this.data.airports.filter((port: { airport_name: string; }) =>
          port.airport_name.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }
}
