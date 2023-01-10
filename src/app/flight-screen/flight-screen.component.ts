import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

const DATA = [
  {'Departure_Airport': "Sydney", 'Arrival_Airport': "Katunayake", 'Flight No': "A001", 'Departure Time': "10-01-2023 08.00.00", 'Arrival Time': "10-01-2023 08.00.00"},
  {'Departure_Airport': "Singapore", 'Arrival_Airport': "Tokyo", 'Flight No': "A001", 'Departure Time': "10-01-2023 08.00.00", 'Arrival Time': "10-01-2023 08.00.00"},
  {'Departure_Airport': "Delhi", 'Arrival_Airport': "Dubai", 'Flight No': "A001", 'Departure Time': "10-01-2023 08.00.00", 'Arrival Time': "10-01-2023 08.00.00"},
  {'Departure_Airport': "Sydney", 'Arrival_Airport': "Mumbai", 'Flight No': "A001", 'Departure Time': "10-01-2023 08.00.00", 'Arrival Time': "10-01-2023 08.00.00"},
]

const COLUMNS = [
  {
    key: "Departure_Airport",
    type: "text",
    label: "Departure Airport"
  },
  {
     key: "Arrival_Airport",
     type: "text",
     label: "Arrival Airport"
   },
   {
     key: "Flight No",
     type: "text",
     label: "FlightNo"
   },
   {
      key: "Departure Time",
      type: "Date",
      label: "Departure Time"
   },
   {
      key: "Arrival Time",
      type: "Date",
      label: "Arrival Time"
   }
]
@Component({
  selector: 'app-flight-screen',
  templateUrl: './flight-screen.component.html',
  styleUrls: ['./flight-screen.component.scss']
})
export class FlightScreenComponent {
  // for table structure
  displayedColumns: string[] = COLUMNS.map((col) => col.key);
  dataSource: any = DATA;
  columnsSchema: any = COLUMNS;

  // for dropdowns in search
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  departures: string[] = Array.from(new Set(DATA.map((col) => col.Departure_Airport)));
  arrivals: string[] = Array.from(new Set(DATA.map((col) => col.Arrival_Airport)));
}
