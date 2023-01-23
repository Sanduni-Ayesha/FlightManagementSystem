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

@Component({
  selector: 'app-add-flight-form',
  templateUrl: './add-flight-form.component.html',
  styleUrls: ['../../../styles/form-overlay.scss'],
})
export class AddFlightFormComponent implements OnInit {
  public airports: string[] = [];
  constructor(
    public dialog: MatDialog,
    @Inject(DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}
  ngOnInit() {
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

  filteredDepartures: string[] | undefined;
  filteredArrivals: string[] | undefined;

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
  flightForm = new FormGroup(
    {
      id: new FormControl(''),
      departureAirport: new FormControl(this.data.row.departureAirport, [
        Validators.required,
      ]),
      arrivalAirport: new FormControl(this.data.row.arrivalAirport, [
        Validators.required,
      ]),
      flightNo: new FormControl(this.data.row.flightNo, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{2}[0-9]{4}$/),
      ]),
      departureTime: new FormControl(this.data.row.departureTime, [
        Validators.required,
      ]),
      arrivalTime: new FormControl(this.data.row.arrivalTime, [
        Validators.required,
      ]),
    },
    { validators: [airportValidator, dateValidator, futureDateValidator] }
  );

  onSubmit() {
    this.dialog.closeAll();
    this.flightForm.value.id = this.data.ds.length + 1;
    this.data.ds.push(this.flightForm.value);
  }

  close() {
    if (confirm('Are you sure you want to cancel?')) {
      this.dialog.closeAll();
    }
  }
  resetRow() {
    if (confirm('Please confirm resetting')) {
      this.flightForm.controls['departureAirport'].setValue(
        this.data.row.departureAirport
      );
      this.flightForm.controls['arrivalAirport'].setValue(
        this.data.row.arrivalAirport
      );
      this.flightForm.controls['flightNo'].setValue(this.data.row.flightNo);
      this.flightForm.controls['departureTime'].setValue(
        this.data.row.departureTime
      );
      this.flightForm.controls['arrivalTime'].setValue(
        this.data.row.arrivalTime
      );
    }
  }

  update() {
    const updatedId = this.data.row.id || null;
    if (confirm('Are you sure you want to update row')) {
      if (updatedId != null) {
        this.data.ds[updatedId - 1] = this.flightForm.value;
      }
    }
    this.dialog.closeAll();
  }
}
