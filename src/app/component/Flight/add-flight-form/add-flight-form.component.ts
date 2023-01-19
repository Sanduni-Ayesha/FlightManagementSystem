import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { airportValidator } from '../../../shared/airport.validator';
import { dateValidator } from '../../../shared/date.validator';
import { futureDateValidator } from '../../../shared/futureDate.validator';

@Component({
  selector: 'app-add-flight-form',
  templateUrl: './add-flight-form.component.html',
  styleUrls: ['./add-flight-form.component.scss'],
})
export class AddFlightFormComponent {
  constructor(
    public dialog: MatDialog,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  flightForm = new FormGroup(
    {
      id: new FormControl(''),
      departureAirport: new FormControl(this.data.row.departureAirport, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      arrivalAirport: new FormControl(this.data.row.arrivalAirport, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]*$/),
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
    this.dialog.closeAll();
  }
  resetRow() {
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
    this.flightForm.controls['arrivalTime'].setValue(this.data.row.arrivalTime);
  }

  update() {
    const updatedId = this.data.row.id || null;
    if (updatedId != null) {
      this.data.ds[updatedId - 1] = this.flightForm.value;
    }
    console.log(this.data.row);
    this.dialog.closeAll();
  }
}
