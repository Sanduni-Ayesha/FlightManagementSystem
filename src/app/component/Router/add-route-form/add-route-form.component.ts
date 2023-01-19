import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {AirportEquality} from "../../../shared/airport.validator";

@Component({
  selector: 'app-add-route-form',
  templateUrl: './add-route-form.component.html',
  styleUrls: ['./add-route-form.component.scss']
})
export class AddRouteFormComponent {

  routeInfo =new FormGroup({
      id: new FormControl(''),
      departureAirport : new FormControl(this.data.rowData.departureAirport,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      arrivalAirport : new FormControl(this.data.rowData.arrivalAirport,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      mileage : new FormControl(this.data.rowData.mileage,[Validators.required,Validators.pattern('[0-9 ]*')]),
      duration : new FormControl(this.data.rowData.duration,[Validators.required,Validators.pattern('[0-9 ]*')])
  }, {
        validators: [AirportEquality]}
  )

  constructor(private fb: FormBuilder,private dialog:MatDialog,@Inject(DIALOG_DATA) public data: any) { }

  onSubmit() {
    this.dialog.closeAll();
    // add value to the id
    this.routeInfo.value.id = this.data.ds.length + 1;
    this.data.ds.push(this.routeInfo.value);
  }

  onUpdate(){
    this.dialog.closeAll();
    this.data.ds[this.data.id-1] = this.routeInfo.value


  }
  onCancel(){
    this.dialog.closeAll();
  }
  get addedDepartureAirport(){
    return this.routeInfo.get('departureAirport')
  }

  get addedArrivalAirport(){
    return this.routeInfo.get('arrivalAirport')
  }
  get addedMileage(){
    return this.routeInfo.get('mileage')
  }
  get addedDuration(){
    return this.routeInfo.get('duration')
  }



}
