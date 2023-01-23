import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {airportValidator} from "../../../shared/airport.validator";

@Component({
  selector: 'app-add-route-form',
  templateUrl: './add-route-form.component.html',
  styleUrls: ['../../../styles/form-overlay.scss']
})
export class AddRouteFormComponent {

  routeInfo = new FormGroup({
      id: new FormControl(''),
      departureAirport: new FormControl(this.data.rowData.departureAirport, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      arrivalAirport: new FormControl(this.data.rowData.arrivalAirport, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      mileage: new FormControl(this.data.rowData.mileage, [Validators.required, Validators.pattern('[0-9 ]*')]),
      duration: new FormControl(this.data.rowData.duration, [Validators.required, Validators.pattern('[0-9 ]*')])
    }, {
      validators: [airportValidator]
    }
  )

  constructor(private fb: FormBuilder, private dialog: MatDialog, @Inject(DIALOG_DATA) public data: any) {
  }
  onSubmit() {
    this.dialog.closeAll();
    this.routeInfo.value.id = this.data.ds.length + 1;
    this.data.ds.push(this.routeInfo.value);
  }

  onUpdate() {
    this.dialog.closeAll();
    this.data.ds[this.data.id - 1] = this.routeInfo.value


  }

  onCancel() {
    if (this.routeInfo.dirty) {
      if (confirm(`Are you sure to cancel!!! \n
      Departure Airport :${this.routeInfo.controls.departureAirport.value}\n
      Arrival Airport   :${this.routeInfo.controls.arrivalAirport.value}\n
      Mileage:${this.routeInfo.controls.mileage.value}\n
      Duration:${this.routeInfo.controls.duration.value}\n
      press OK button to cancel
    `) == true) {
        this.dialog.closeAll();
      }
    } else {
      this.dialog.closeAll();
    }

  }

  onReset() {
    if(this.routeInfo.controls.id.value != '' ) {
      this.routeInfo.controls.id.setValue(this.data.ds[this.data.id - 1].id)
      this.routeInfo.controls.departureAirport.setValue(this.data.ds[this.data.id - 1].departureAirport)
      this.routeInfo.controls.arrivalAirport.setValue(this.data.ds[this.data.id - 1].arrivalAirport)
      this.routeInfo.controls.mileage.setValue(this.data.ds[this.data.id - 1].mileage)
      this.routeInfo.controls.duration.setValue(this.data.ds[this.data.id - 1].duration)
    }
    else{
      this.routeInfo.controls.departureAirport.setValue('')
      this.routeInfo.controls.arrivalAirport.setValue('')
      this.routeInfo.controls.mileage.setValue('')
      this.routeInfo.controls.duration.setValue('')
    }
  }

  get addedDepartureAirport() {
    return this.routeInfo.get('departureAirport')
  }

  get addedArrivalAirport() {
    return this.routeInfo.get('arrivalAirport')
  }

  get addedMileage() {
    return this.routeInfo.get('mileage')
  }

  get addedDuration() {
    return this.routeInfo.get('duration')
  }

}
