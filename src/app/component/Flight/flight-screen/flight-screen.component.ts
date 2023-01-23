import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AddFlightFormComponent } from '../add-flight-form/add-flight-form.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

const DATA = [
  {
    id: 1,
    departureAirport: 'Honiara International Airport',
    arrivalAirport: 'Dublin Airport',
    flightNo: 'AB2001',
    departureTime: '2023-01-20T12:12',
    arrivalTime: '2023-01-23T12:12',
  },
  {
    id: 2,
    departureAirport: 'Singapore',
    arrivalAirport: 'Tokyo',
    flightNo: 'A001',
    departureTime: '2023-01-20T12:12',
    arrivalTime: '2023-01-23T12:12',
  },
  {
    id: 3,
    departureAirport: 'Delhi',
    arrivalAirport: 'Dubai',
    flightNo: 'A001',
    departureTime: '2023-01-20T12:12',
    arrivalTime: '2023-01-23T12:12',
  },
  {
    id: 4,
    departureAirport: 'Sydney',
    arrivalAirport: 'Mumbai',
    flightNo: 'A001',
    departureTime: '2023-01-20T12:12',
    arrivalTime: '2023-01-23T12:12',
  },
  {
    id: 5,
    departureAirport: 'Bandaranaike International Colombo Airport',
    arrivalAirport: 'Sydney Kingsford Smith International Airport',
    flightNo: 'SD1290',
    departureTime: '2023-01-20T12:12',
    arrivalTime: '2023-01-23T12:12',
  },
];

const COLUMNS = [
  {
    key: 'departureAirport',
    type: 'text',
    label: 'Departure Airport',
  },
  {
    key: 'arrivalAirport',
    type: 'text',
    label: 'Arrival Airport',
  },
  {
    key: 'flightNo',
    type: 'text',
    label: 'Flight No',
  },
  {
    key: 'departureTime',
    type: 'datetime-local',
    label: 'Departure Time',
  },
  {
    key: 'arrivalTime',
    type: 'datetime-local',
    label: 'Arrival Time',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: 'Edit',
  },
  {
    key: 'isDelete',
    type: 'isDelete',
    label: 'Delete',
  },
];
@Component({
  selector: 'app-flight-screen',
  templateUrl: './flight-screen.component.html',
  styleUrls: ['../../../styles/main-screen.scss'],
})
export class FlightScreenComponent implements OnInit {
  public airports: string[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient) {}
  ngOnInit() {
    this.loadAirports();
    this.filterDepart.valueChanges
      .pipe(map((value) => this.filterAirports(value || '')))
      .subscribe((departures) => {
        this.filteredDepartures = departures;
      });

    this.filterArrive.valueChanges
      .pipe(map((value) => this.filterAirports(value || '')))
      .subscribe((arrivals) => {
        this.filteredArrivals = arrivals;
      });
  }

  dataSource: any = DATA;
  columnsSchema: any = COLUMNS;

  filterDepart = new FormControl('');
  filterArrive = new FormControl('');

  filteredDepartures: string[] | undefined;
  filteredArrivals: string[] | undefined;
  private newFlight: number = -1;

  loadAirports() {
    this.http
      .get('/assets/airports.csv', { responseType: 'text' })
      .subscribe((airportList) => {
        this.airports = airportList.split('\n');
      });
  }
  private filterAirports(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.airports) {
      return this.airports.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }

  filter(departure: string, arrive: string) {
    if (departure != '') {
      this.dataSource = this.dataSource.filter(
        (data: any) => data.departureAirport == departure
      );
    }
    if (arrive != '') {
      this.dataSource = this.dataSource.filter(
        (data: any) => data.arrivalAirport == arrive
      );
    }
    if (arrive == '' && departure == '') {
      this.dataSource = DATA;
    }
  }

  removeRow(id: number) {
    if (confirm('Please confirm deleting')) {
      this.dataSource = this.dataSource.filter((data: any) => data.id != id);
    }
  }

  openForm(id: number) {
    let rowData: string;
    let ID: string | number;
    if (id == this.newFlight) {
      ID = '';
      rowData = '';
    } else {
      ID = id - 1;
      rowData = this.dataSource[id - 1];
    }
    this.dialog.open(AddFlightFormComponent, {
      disableClose: true,
      data: {
        id: ID,
        ds: this.dataSource,
        row: rowData,
      },
    });
  }
}
