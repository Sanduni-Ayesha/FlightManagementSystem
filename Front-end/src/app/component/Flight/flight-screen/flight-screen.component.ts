import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AddFlightFormComponent } from '../add-flight-form/add-flight-form.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {Flight} from "../../../model/Flight";
import {FlightDataService} from "../../../services/flight-data/flight-data.service";

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
  columnsSchema: any = COLUMNS;
  filteredDepartures: string[] | undefined;
  filteredArrivals: string[] | undefined;
  filterDepart = new FormControl('');
  filterArrive = new FormControl('');

  constructor(private flightService: FlightDataService , public dialog: MatDialog, private http: HttpClient) {}
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

    this.getFlightDetails();
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

  filterByAirport(departure: string, arrive: string) {
    if(departure=='' && arrive==''){
      this.filterDepart.reset();
      this.filterArrive.reset();
      this.getFlightDetails();
    }
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
  }

  getFlightDetails(){
    this.flightService.getAllFlights().subscribe(flights =>{
      this.flightDetails = flights
      this.allFlightDetails = flights
    })
  }
  removeFlight(id: number) {
    this.getFlightDetails();
    if (confirm('Please confirm deleting')) {
      this.flightService.deleteFlight(id).subscribe(()=>this.getFlightDetails());
    }
  }

  openAddFlightForm(type: string, flight: Flight|null) {
    let rowData: Flight |null;
    if (type=='edit') {
      rowData = flight;
    } else {
      rowData = new Flight(-1,"","", "","","");
    }
    let addFlightForm = this.dialog.open(AddFlightFormComponent, {
      disableClose: true,
      data: {
        flightData: this.flightDetails,
        row: rowData,
      },
    });
    addFlightForm.afterClosed().subscribe(()=>{
      this.getFlightDetails();
      this.filterDepart.reset();
      this.filterArrive.reset();
    }
    )
  }
}
