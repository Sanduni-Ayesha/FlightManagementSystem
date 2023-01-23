import { Component, OnInit } from '@angular/core';
import { FormControl, ɵElement, ɵValue } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddRouteFormComponent } from '../add-route-form/add-route-form.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";

const userData = [
  {
    id: 1,
    departureAirport: 'Sofia Airport',
    arrivalAirport: 'Varna Airport',
    mileage: '36',
    duration: '20',
  },
  {
    id: 2,
    departureAirport: 'Bandaranaike International Colombo Airport',
    arrivalAirport: 'London Luton Airport',
    mileage: '280',
    duration: '20',
  },
  {
    id: 3,
    departureAirport: 'Honiara International Airport',
    arrivalAirport: 'Tokyo Haneda International Airport',
    mileage: '287',
    duration: '220',
  },
  {
    id: 4,
    departureAirport: 'Indianapolis International Airport',
    arrivalAirport: 'Turin Airport',
    mileage: '283',
    duration: '260',
  },
];
const columnSchema = [
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
    key: 'mileage',
    type: 'text',
    label: 'Mileage/Km',
  },
  {
    key: 'duration',
    type: 'text',
    label: 'Duration/Hours',
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
  selector: 'app-route-screen',
  templateUrl: './route-screen.component.html',
  styleUrls: ['../../../styles/main-screen.scss'],
})
export class RouteScreenComponent implements OnInit {
  columnsSchema: any = columnSchema;
  dataSet: any = userData;
  temporaryDataSet: any = [];
  arrivalControl = new FormControl('');
  departureControl = new FormControl('');
  filteredArrivalAirport: string[] | undefined;
  filteredDepartureAirport: string[] | undefined;
  errorMessage: string | undefined;
 public airport: string[] =[];
  constructor(public dialog: MatDialog , private http:HttpClient) {}

  ngOnInit() {
    this.loadAirports()

    this.arrivalControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterAirport(value || '')))
      .subscribe((arrivals) => {
        this.filteredArrivalAirport = arrivals;
      });
    ;
    this.departureControl.valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filterAirport(value || ''))).subscribe((departures) => {
        this.filteredDepartureAirport = departures;
      });
  }

  private filterAirport(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.airport) {
      return this.airport.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }

  openForm(_id=-1): void {
    let row:Array<object>|'';
    let id:number|'';
    if(_id != -1){
      id = _id;
      row = this.dataSet[_id-1];
    }
    else{
      id = ''
      row = ''
    }

    this.dialog.open(AddRouteFormComponent, {
      height: '520px',
      disableClose: true,
      width: '600px',
      data: {
        ds: this.dataSet,
        id: id,
        rowData: row,
      },
    });
  }

  removeRow(id: number) {
    if (confirm("Press Ok to confirm the deletion !!!") == true) {
      const index = this.dataSet.findIndex((value: any) => value.id === id);
      this.dataSet.splice(index, 1);
    }

  }

  search() {
    if (
      this.dataSet.find(
        (obj: any) =>
          obj.departureAirport === this.departureControl.value ||
          obj.arrivalAirport === this.arrivalControl.value
      )
    ) {
      this.temporaryDataSet = this.dataSet;
      const filterAirportData = this.dataSet.filter((obj: any) => {
        return (
          obj.departureAirport === this.departureControl.value ||
          obj.arrivalAirport === this.arrivalControl.value
        );
      });
      this.errorMessage = '';
      this.dataSet = filterAirportData;
    } else {
      this.errorMessage =
        'The Searching route is not available in the system!!!';
    }
  }

  clearSearch() {
    if (confirm("Press Ok to confirm the cancel !!!") == true) {
    if (this.temporaryDataSet.length)
    {
      this.dataSet = this.temporaryDataSet;
    }}
  }

  loadAirports() {
    this.http
      .get('/assets/airports.csv', { responseType: 'text' })
      .subscribe((airportList) => {
        this.airport = airportList.split('\n');
      });
  }

}
