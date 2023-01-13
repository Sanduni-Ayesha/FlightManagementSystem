import {Component, Inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CreateRouteTableComponent} from "../create-route-table/create-route-table.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";

@Component({
  selector: 'app-add-route-form',
  templateUrl: './add-route-form.component.html',
  styleUrls: ['./add-route-form.component.scss']
})
export class AddRouteFormComponent {
  routeInfo = this.fb.group({
    departureAirport : [''],
    arrivalAirport: [''],
    mileage: [''],
    duration: ['']
  });

  constructor(private fb: FormBuilder,private dialog:MatDialog,@Inject(DIALOG_DATA) public data: any) { }

  onSubmit() {
    this.dialog.closeAll();
    //dynamically updates datasource by pushing the new data from the form
    this.data.ds.data.push(this.routeInfo.value);
    //update the datasource with new data
    this.data.ds._updateChangeSubscription();
    //this.detailsEmitter.emit(this.flightForm.value);
  }

}
