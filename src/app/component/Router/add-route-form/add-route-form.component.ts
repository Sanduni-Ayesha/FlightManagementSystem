import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CreateRouteTableComponent} from "../create-route-table/create-route-table.component";

@Component({
  selector: 'app-add-route-form',
  templateUrl: './add-route-form.component.html',
  styleUrls: ['./add-route-form.component.scss']
})
export class AddRouteFormComponent {
  routeInfo = this.fb.group({
    departureAirport_ : '',
    arrivalAirport_: '',
    mileage_: 0,
    Duration_: 0
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    const routeArray = new CreateRouteTableComponent();
    routeArray.onUpdate(this.routeInfo.value.departureAirport_,
                        this.routeInfo.value.arrivalAirport_,
                        this.routeInfo.value.mileage_,
                        this.routeInfo.value.Duration_);
  }

}
