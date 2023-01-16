import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
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
  //inject the formBuilder service
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  flightForm = new FormGroup(
    {
      id: new FormControl(''),
      Departure_Airport: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      Arrival_Airport: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      'Flight No': new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{2}[0-9]{4}$/),
      ]),
      'Departure Time': new FormControl('', [Validators.required]),
      'Arrival Time': new FormControl('', [Validators.required]),
    },
    { validators: [airportValidator, dateValidator, futureDateValidator] }
  );

  onSubmit() {
    //console.log(this.flightForm.get('Departure_Airport')?.touched);
    this.dialog.closeAll();
    this.flightForm.value.id = this.data.ds.data.length + 1;
    this.data.ds.data.push(this.flightForm.value);
    this.data.ds._updateChangeSubscription();
  }

  close() {
    this.dialog.closeAll();
  }
}
