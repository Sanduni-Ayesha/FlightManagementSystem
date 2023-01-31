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
        flightNo: new FormControl([
          Validators.required,
          Validators.pattern(/^[a-zA-Z]{2}[0-9]{4}$/),
        ]),
        departureTime: new FormControl([
          Validators.required,
        ]),
        arrivalTime: new FormControl([
          Validators.required,
        ]),
      },
      { validators: [airportValidator, dateValidator, futureDateValidator] }

  );

  constructor(
    public dialog: MatDialog,
    @Inject(DIALOG_DATA) public data: any,
    private http: HttpClient
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
    this.dialog.closeAll();
    this.flightForm.value.id = this.data.ds.length + 1;
    this.data.ds.push(this.flightForm.value);
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
      if (confirm('Are you sure you want to update data?')) {
        if (updatedId != null) {
          this.data.ds[updatedId - 1] = this.flightForm.value;
        }
      }
    }
    this.dialog.closeAll();
  }
}
