import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {airportValidator} from "../../../shared/airport.validator";
import {RouteService} from "../../../services/route/route.service";

@Component({
  selector: 'app-add-route-form',
  templateUrl: './add-route-form.component.html',
  styleUrls: ['../../../styles/form-overlay.scss']
})
export class AddRouteFormComponent {

  routeInfo = new FormGroup({
      id: new FormControl(this.data.rowData.id),
      departureAirport: new FormControl(this.data.rowData.departureAirport, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      arrivalAirport: new FormControl(this.data.rowData.arrivalAirport, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      mileage: new FormControl(this.data.rowData.mileage, [Validators.required, Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')]),
      duration: new FormControl(this.data.rowData.duration, [Validators.required, Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')])
    }, {
      validators: [airportValidator]
    }
  )

  constructor(private routeService: RouteService , private fb: FormBuilder, private dialog: MatDialog, @Inject(DIALOG_DATA) public data: any) {
  }
  onSubmit() {
    if (confirm('Are you sure you want to add the new route?') == true){
      this.routeService.createRoute(this.routeInfo.value).subscribe();
    }
    this.dialog.closeAll();
  }

  onUpdate() {
    if (this.routeInfo.dirty) {
    if (confirm('Are you sure you want to update the data?') == true) {
     this.routeService.updateRoute(this.routeInfo.value).subscribe();
    }}
    this.dialog.closeAll();
  }

  onCancel() {
    if (this.routeInfo.dirty) {
      if (confirm('Are you sure you want to cancel?') == true) {
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
