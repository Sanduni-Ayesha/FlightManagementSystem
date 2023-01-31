import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AddFlightFormComponent } from '../add-flight-form/add-flight-form.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {Flight} from "../../../model/Flight";
import {FlightDataService} from "../../../services/flight-data/flight-data.service";

const DATA = [
  {
    id: 1,
    departureAirport: 'Honiara International Airport',
    arrivalAirport: 'Dublin Airport',
    flightNo: 'AB2001',
    departureTime: '2023-01-28T12:12',
    arrivalTime: '2023-01-30T12:12',
  },
  {
    id: 2,
    departureAirport: 'Port Moresby Jacksons International Airport',
    arrivalAirport: 'Houari Boumediene Airport',
    flightNo: 'LP3001',
    departureTime: '2023-01-28T12:12',
    arrivalTime: '2023-01-30T12:12',
  },
  {
    id: 3,
    departureAirport: 'Brussels Airport',
    arrivalAirport: 'Frankfurt Airport',
    flightNo: 'AK1001',
    departureTime: '2023-01-28T12:12',
    arrivalTime: '2023-01-30T12:12',
  },
  {
    id: 4,
    departureAirport: 'Munich Airport',
    arrivalAirport: 'London Luton Airport',
    flightNo: 'AX2001',
    departureTime: '2023-01-28T12:12',
    arrivalTime: '2023-01-30T12:12',
  },
  {
    id: 5,
    departureAirport: 'Bandaranaike International Colombo Airport',
    arrivalAirport: 'Sydney Kingsford Smith International Airport',
    flightNo: 'SD1290',
    departureTime: '2023-01-28T12:12',
    arrivalTime: '2023-01-30T12:12',
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
  public flightDetails: Flight[] = [];
  public allFlightDetails: Flight[] = [];
  private newFlight: number = -1;
  dataSource: any = DATA;
  columnsSchema: any = COLUMNS;
  filteredDepartures: string[] | undefined;
  filteredArrivals: string[] | undefined;
  filterDepart = new FormControl('');
  filterArrive = new FormControl('');

  constructor(private flightService: FlightDataService ,public dialog: MatDialog, private http: HttpClient) {}
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

    this.flightService.getAllFlights().subscribe((flights)=>{
      this.flightDetails = flights
      this.allFlightDetails = flights
    })
  }

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
      this.flightDetails = this.flightDetails.filter(
        (data: any) => data.departureAirport == departure
      );
    }
    if (arrive != '') {
      this.flightDetails = this.flightDetails.filter(
        (data: any) => data.arrivalAirport == arrive
      );
    }
    if (arrive == '' && departure == '') {
      this.flightDetails = this.allFlightDetails;
    }
  }

  removeRow(id: number) {
    if (confirm('Please confirm deleting')) {
      this.dataSource = this.dataSource.filter((data: any) => data.id != id);
    }
  }

  openForm(type: string,id: number) {
    let rowData: Flight;
    if (type=='edit') {
      rowData = this.flightDetails[id-1];
    } else {
      rowData = new Flight(-1,""," ", "",new Date(),new Date());
    }
    this.dialog.open(AddFlightFormComponent, {
      disableClose: true,
      data: {
        ds: this.flightDetails,
        row: rowData,
      },
    });
  }
}
