import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { AddFlightFormComponent } from '../add-flight-form/add-flight-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

const DATA = [
  {
    id: 1,
    Departure_Airport: 'Sydney',
    Arrival_Airport: 'Katunayake',
    'Flight No': 'A001',
    'Departure Time': '10-01-2023 08.00.00',
    'Arrival Time': '10-01-2023 08.00.00',
  },
  {
    id: 2,
    Departure_Airport: 'Singapore',
    Arrival_Airport: 'Tokyo',
    'Flight No': 'A001',
    'Departure Time': '10-01-2023 08.00.00',
    'Arrival Time': '10-01-2023 08.00.00',
  },
  {
    id: 3,
    Departure_Airport: 'Delhi',
    Arrival_Airport: 'Dubai',
    'Flight No': 'A001',
    'Departure Time': '10-01-2023 08.00.00',
    'Arrival Time': '10-01-2023 08.00.00',
  },
  {
    id: 4,
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
  {
    key: 'isDelete',
    type: 'isDelete',
    label: '',
  },
];
@Component({
  selector: 'app-flight-screen',
  templateUrl: './flight-screen.component.html',
  styleUrls: ['./flight-screen.component.scss'],
})
export class FlightScreenComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
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

  removeRow(id: number) {
    this.dataSource.data = this.dataSource.data.filter((u: any) => u.id != id);
  }

  openForm(): void {
    //TODO get data here

    const formModal = this.dialog.open(AddFlightFormComponent, {
      width: '640px',
    });
    //formModal.afterClosed().subscribe();
    /*DATA.push(DATA[0]);
    this.dataSource = new MatTableDataSource(DATA);*/
  }
}
