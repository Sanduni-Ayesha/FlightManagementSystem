import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';

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

  /*@Output()
  detailsEmitter = new EventEmitter();*/
  flightForm = this.formBuilder.group({
    Departure_Airport: ['', Validators.required],
    Arrival_Airport: ['', Validators.required],
    'Flight No': ['', Validators.required],
    'Departure Time': [''],
    'Arrival Time': [''],
  });

  onSubmit() {
    this.dialog.closeAll();
    //dynamically updates datasource by pushing the new data from the form
    this.data.ds.data.push(this.flightForm.value);
    //update the datasource with new data
    this.data.ds._updateChangeSubscription();
    //this.detailsEmitter.emit(this.flightForm.value);
    //console.log(this.data.ds.data);
    /*    console.log(this.data.ds.data[1]);
    console.log(this.flightForm.value);*/
  }
}
