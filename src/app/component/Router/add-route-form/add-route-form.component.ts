import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateRouteTableComponent} from "../create-route-table/create-route-table.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {AbstractControl} from "@angular/forms";
import {AirportEquality} from "../../../shared/airport.validator";

@Component({
  selector: 'app-add-route-form',
  templateUrl: './add-route-form.component.html',
  styleUrls: ['./add-route-form.component.scss']
})
export class AddRouteFormComponent {

  // Dep_Error_message:any|undefined;
  routeInfo =new FormGroup({
    id: new FormControl(''),
    departureAirport : new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      arrivalAirport : new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
        mileage : new FormControl('',[Validators.required,Validators.pattern('[0-9 ]*')]),
        duration : new FormControl('',[Validators.required,Validators.pattern('[0-9 ]*')])
  }, {
        validators: [AirportEquality]}
  )

  constructor(private fb: FormBuilder,private dialog:MatDialog,@Inject(DIALOG_DATA) public data: any) { }

  onSubmit() {
    this.dialog.closeAll();
    // add values to the id
   this.routeInfo.value.id = this.data.ds.data.length + 1;
    this.data.ds.data.push(this.routeInfo.value);
    //update the datasource with new data
    this.data.ds._updateChangeSubscription();
  }
  onCancel(){
    this.dialog.closeAll();
  }
  get AddedDepartureAirport(){
    return this.routeInfo.get('departureAirport')
  }

  get AddedArrivalAirport(){
    return this.routeInfo.get('arrivalAirport')
  }
  get AddedMileage(){
    return this.routeInfo.get('mileage')
  }
  get AddedDuration(){
    console.log(this.routeInfo.get('duration'))
    return this.routeInfo.get('duration')
  }



}
