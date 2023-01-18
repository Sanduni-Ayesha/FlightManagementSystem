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
      Departure_Airport: new FormControl(this.data.row.Departure_Airport, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      Arrival_Airport: new FormControl(this.data.row.Arrival_Airport, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      FlightNo: new FormControl(this.data.row.FlightNo, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{2}[0-9]{4}$/),
      ]),
      Departure_Time: new FormControl(this.data.row.Departure_Time, [
        Validators.required,
      ]),
      Arrival_Time: new FormControl(this.data.row.Arrival_Time, [
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
    this.flightForm.controls['Departure_Airport'].setValue(
      this.data.row.Departure_Airport
    );
    this.flightForm.controls['Arrival_Airport'].setValue(
      this.data.row.Arrival_Airport
    );
    this.flightForm.controls['FlightNo'].setValue(this.data.row.FlightNo);
    this.flightForm.controls['Departure_Time'].setValue(
      this.data.row.Departure_Time
    );
    this.flightForm.controls['Arrival_Time'].setValue(
      this.data.row.Arrival_Time
    );
  }

  update() {
    const updated_id = this.data.row.id || null;
    if (updated_id != null) {
      this.data.ds[updated_id - 1] = this.flightForm.value;
    }
    console.log(this.data.row);
    this.dialog.closeAll();
  }
}
