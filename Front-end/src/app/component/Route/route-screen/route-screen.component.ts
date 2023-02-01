import { Component, OnInit } from '@angular/core';
import { FormControl, ɵElement, ɵValue } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddRouteFormComponent } from '../add-route-form/add-route-form.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Route} from "../../../model/Route";
import {RouteService} from "../../../services/route/route.service";


const TableHeading = ['Departure Airport','Arrival Airport','Mileage/Km','Duration/Hours']

@Component({
  selector: 'app-route-screen',
  templateUrl: './route-screen.component.html',
  styleUrls: ['../../../styles/main-screen.scss'],
})
export class RouteScreenComponent implements OnInit {
  routeTableHeading: any = TableHeading;

  temporaryDataSet: any = [];
  arrivalControl = new FormControl('');
  departureControl = new FormControl('');
  filteredArrivalAirport: string[] | undefined;
  filteredDepartureAirport: string[] | undefined;
  errorMessage: string | undefined;
 public airport: string[] =[]
 public routeDetails:Route[] = [];
  public allRouteDetails: any;
  constructor(private routeService: RouteService , public dialog: MatDialog , private http:HttpClient) {}

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
    this.getRoutes()
    this.allRouteDetails = this.routeDetails;
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
    let row:Route|'';
    let id:number|'';
    if(_id != -1){
      id = _id;
      row = this.routeDetails[_id-1];
    }
    else{
      id = ''
      row = '';
    }

    this.dialog.open(AddRouteFormComponent, {
      height: '520px',
      disableClose: true,
      width: '600px',
      data: {
        ds: this.routeDetails,
        id: id,
        rowData: row,
      },
    });
  }
   private getRoutes(){
        this.routeService.getAllRoutes().subscribe((route)=>{
            this.routeDetails=route;
        })
    }
  removeRow(id: number) {
    if (confirm("Press Ok to confirm the deletion !!!") == true) {
        this.routeService.deleteRoute(id) .subscribe();
        this.getRoutes()
    }

  }

  search() {
    if (
      this.allRouteDetails.find(
        (obj: any) =>
          obj.departureAirport === this.departureControl.value ||
          obj.arrivalAirport === this.arrivalControl.value
      )
    ) {
      this.temporaryDataSet = this.allRouteDetails;
      const filterAirportData = this.allRouteDetails.filter((obj: any) => {
        return (
          obj.departureAirport === this.departureControl.value ||
          obj.arrivalAirport === this.arrivalControl.value
        );
      });
      this.errorMessage = '';
      this.allRouteDetails = filterAirportData;
    } else {
      this.errorMessage =
        'The Searching route is not available in the system!!!';
    }
  }

  clearSearch() {

    if (this.temporaryDataSet.length)
    {
      this.allRouteDetails = this.temporaryDataSet;
    }
  }

  loadAirports() {
    this.http
      .get('/assets/airports.csv', { responseType: 'text' })
      .subscribe((airportList) => {
        this.airport = airportList.split('\n');
      });
  }

}
