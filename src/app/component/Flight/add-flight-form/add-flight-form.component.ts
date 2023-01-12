import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-flight-form',
  templateUrl: './add-flight-form.component.html',
  styleUrls: ['./add-flight-form.component.scss'],
})
export class AddFlightFormComponent {
  //inject the formBuilder service
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {}

  /*@Output()
  detailsEmitter = new EventEmitter();*/
  flightForm = this.formBuilder.group({
    DepartureAirport: ['', Validators.required],
    ArrivalAirport: ['', Validators.required],
    Flight: ['', Validators.required],
    DepartureDateTimeControl: [''],
    ArrivalDateTimeControl: [''],
  });

  onSubmit() {
    this.dialog.closeAll();
    //this.detailsEmitter.emit(this.flightForm.value);
    console.log(this.flightForm.value);
  }
}
