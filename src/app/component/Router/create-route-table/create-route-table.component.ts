import { Component } from '@angular/core';

const USER_DATA = [
  {"departureAirport": "Colombo", "arrivalAirport": "Dubai", "mileage": 36,"duration":20},
  {"departureAirport": "Katunayaka", "arrivalAirport": "Dubai", "mileage": 28,"duration":20}
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
    type: "number",
    label: "Mileage/Km"
  }
  ,
  {
    key: "duration",
    type: "number",
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
  dataSource: any = USER_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;
}
