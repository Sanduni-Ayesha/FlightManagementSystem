import { Component } from '@angular/core';
import {ɵElement, ɵValue} from "@angular/forms";

import {MatDialog} from "@angular/material/dialog";
import {AddRouteFormComponent} from "../add-route-form/add-route-form.component";
import {MatTableDataSource} from "@angular/material/table";

const USER_DATA = [
  {"departureAirport": "Colombo", "arrivalAirport": "Dubai", "mileage": "36","duration":"20"},
  {"departureAirport": "Katunayaka", "arrivalAirport": "Dubai", "mileage": "28","duration":"20"}
];
const COLUMNS_SCHEMA = [
  {
    key: "departureAirport",
    type: "text",
    label: "Departure Airport"
  },
  {
    key: "arrivalAirport",
    type: "text",
    label: "Arrival Airport"
  },
  {
    key: "mileage",
    type: "text",
    label: "Mileage/Km"
  }
  ,
  {
    key: "duration",
    type: "text",
    label: "Duration/Hours"
  }
  ,
  {
    key: "isEdit",
    type: "isEdit",
    label: "Edit "
  }
]
@Component({
  selector: 'app-create-route-table',
  templateUrl: './create-route-table.component.html',
  styleUrls: ['./create-route-table.component.scss']
})
export class CreateRouteTableComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any =  new MatTableDataSource(USER_DATA);
  columnsSchema: any = COLUMNS_SCHEMA;

  constructor(public dialog: MatDialog) {}

 openForm() :void{
   let dialogRef = this.dialog.open(AddRouteFormComponent, {
     height: '400px',
     width: '600px',
     data: {
       ds: this.dataSource,
     },

   });
 }
}
