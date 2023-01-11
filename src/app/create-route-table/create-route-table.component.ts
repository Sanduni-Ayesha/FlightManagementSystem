import { Component } from '@angular/core';

const USER_DATA = [
  {"Departure Airport": "Colombo", "Arrival Airport": "Dubai", "Mileage/Km": 36,"Duration/Hours":20},
  {"Departure Airport": "Katunayaka", "Arrival Airport": "Dubai", "Mileage/Km": 28,"Duration/Hours":20}
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
