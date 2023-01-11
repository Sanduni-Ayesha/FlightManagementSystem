import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

const DATA = [
  {
    Departure_Airport: 'Sydney',
    Arrival_Airport: 'Katunayake',
    'Flight No': 'A001',
    'Departure Time': '10-01-2023 08.00.00',
    'Arrival Time': '10-01-2023 08.00.00',
  },
  {
    Departure_Airport: 'Singapore',
    Arrival_Airport: 'Tokyo',
    'Flight No': 'A001',
    'Departure Time': '10-01-2023 08.00.00',
    'Arrival Time': '10-01-2023 08.00.00',
  },
  {
    Departure_Airport: 'Delhi',
    Arrival_Airport: 'Dubai',
    'Flight No': 'A001',
    'Departure Time': '10-01-2023 08.00.00',
    'Arrival Time': '10-01-2023 08.00.00',
  },
  {
    Departure_Airport: 'Sydney',
    Arrival_Airport: 'Mumbai',
    'Flight No': 'A001',
    'Departure Time': '10-01-2023 08.00.00',
    'Arrival Time': '10-01-2023 08.00.00',
  },
];

const COLUMNS = [
  {
    key: 'Departure_Airport',
    type: 'text',
    label: 'Departure Airport',
  },
  {
    key: 'Arrival_Airport',
    type: 'text',
    label: 'Arrival Airport',
  },
  {
    key: 'Flight No',
    type: 'text',
    label: 'FlightNo',
  },
  {
    key: 'Departure Time',
    type: 'Date',
    label: 'Departure Time',
  },
  {
    key: 'Arrival Time',
    type: 'Date',
    label: 'Arrival Time',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
  /*{
    key: 'Delete',
    type: 'isDelete',
    label: '',
  },*/
];
@Component({
  selector: 'app-flight-screen',
  templateUrl: './flight-screen.component.html',
  styleUrls: ['./flight-screen.component.scss'],
})
export class FlightScreenComponent implements OnInit {
  // for table structure
  displayedColumns: string[] = COLUMNS.map((col) => col.key);
  dataSource: any = new MatTableDataSource(DATA);
  columnsSchema: any = COLUMNS;

  // for dropdowns in search
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  departures: string[] = Array.from(
    new Set(DATA.map((col) => col.Departure_Airport))
  );
  arrivals: string[] = Array.from(
    new Set(DATA.map((col) => col.Arrival_Airport))
  );

  //functions for search option
  filteredDepartures: Observable<string[]> | undefined;
  filteredArrivals: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredDepartures = this.myControl1.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterDeparture(value || ''))
    );
    this.filteredArrivals = this.myControl2.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterArrivals(value || ''))
    );
  }

  private filterDeparture(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.departures.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  private filterArrivals(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.arrivals.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  filter(departure: string, arrive: string) {
    /*departure = 'hello';
    arrive = 'world';*/
    //console.log(this.dataSource);
    this.dataSource.filter = departure;
    this.dataSource.filter = arrive;
    console.log(this.dataSource.filteredData.length == 0);
  }
}
