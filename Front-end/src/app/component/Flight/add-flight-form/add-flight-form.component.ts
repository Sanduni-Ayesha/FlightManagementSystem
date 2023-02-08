import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { airportValidator } from '../../../shared/airport.validator';
import { dateValidator } from '../../../shared/date.validator';
import { futureDateValidator } from '../../../shared/futureDate.validator';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {FlightDataService} from "../../../services/flight-data/flight-data.service";
import {Flight} from "../../../model/Flight";

@Component({
  selector: 'app-add-flight-form',
  templateUrl: './add-flight-form.component.html',
  styleUrls: ['../../../styles/form-overlay.scss'],
})
export class AddFlightFormComponent implements OnInit {
  public airports: string[] = [];
  filteredDepartures: string[] | undefined;
  filteredArrivals: string[] | undefined;

  flightForm = new FormGroup(
      {
        id: new FormControl(''),
        departureAirport: new FormControl('', [
          Validators.required,
        ]),
        arrivalAirport: new FormControl('', [
          Validators.required,
        ]),
        flightNo: new FormControl('',[
          Validators.required,
          Validators.pattern(/^[a-zA-Z]{2}[0-9]{4}$/),
        ]),
        departureTime: new FormControl('',[
          Validators.required,
        ]),
        arrivalTime: new FormControl('',[
          Validators.required,
        ]),
      },
      { validators: [airportValidator, dateValidator, futureDateValidator] }

  );

  constructor(
    public dialog: MatDialog,
    @Inject(DIALOG_DATA) public data: any,
    private http: HttpClient,
    private flightService: FlightDataService ,
  ) {}
  ngOnInit() {
    this.flightForm.patchValue(this.data.row)
    this.loadAirports();
    this.flightForm.controls['departureAirport'].valueChanges
      .pipe(map((value) => this.filterAirports(value || '')))
      .subscribe((departures) => {
        this.filteredDepartures = departures;
      });

    this.flightForm.controls['arrivalAirport'].valueChanges
      .pipe(map((value) => this.filterAirports(value || '')))
      .subscribe((arrivals) => {
        this.filteredArrivals = arrivals;
      });
  }

  loadAirports() {
    this.http
      .get('/assets/airports.csv', { responseType: 'text' })
      .subscribe((airportList) => {
        this.airports = airportList.split('\n');
      });
  }
  private filterAirports(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.airports) {
      return this.airports.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }

  onSubmit() {
    let f = this.flightForm.value
    let lastID  = this.data.flightData[(this.data.flightData.length-1)].id;
    let newFlight = new Flight((lastID+1), <string>f.departureAirport, <string>f.arrivalAirport,<string>f.flightNo,<string>f.departureTime,<string>f.arrivalTime);
    if (this.checkFlightExistence(newFlight)){
        alert("The flight is already used in the given time!\n Please use a different time.")
    }else {
        this.flightService.addFlight(newFlight).subscribe();
        this.dialog.closeAll();
    }
  }

  checkFlightExistence(flight: Flight):boolean{
      let flightNo = flight.flightNo;
      let departureTime = new Date(flight.departureTime);
      let arrivalTime = new Date(flight.arrivalTime);

      for (const flightData of this.data.flightData) {
          let departure = new Date(flightData.departureTime);
          let arrival = new Date(flightData.arrivalTime);

          if (flightNo==flightData.flightNo && (departure.toString() == departureTime.toString() || arrival.toString()==arrivalTime.toString())){
              return true;
          }
      }
      return false;
  }

  close(dirty: boolean) {
    if (!dirty) {
      this.dialog.closeAll();
    } else if (confirm('Are you sure you want to cancel?')) {
      this.dialog.closeAll();
    }
  }
  resetRow() {
    this.flightForm.patchValue(this.data.row);
  }

  update(dirty: boolean) {
    const updatedId = this.data.row.id || null;
    if (dirty) {
        if (updatedId != null) {
          let f = this.flightForm.value;
          let newFlight = new Flight(updatedId, <string>f.departureAirport, <string>f.arrivalAirport,<string>f.flightNo,<string>f.departureTime,<string>f.arrivalTime);
          this.flightService.updateFlight(newFlight).subscribe();
        }
    }
    this.dialog.closeAll();
  }
}
