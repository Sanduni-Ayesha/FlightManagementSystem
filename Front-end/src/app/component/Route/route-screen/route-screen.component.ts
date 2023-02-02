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
  private findRoute(id:number):any{
      let routeIndex=0
      for(routeIndex=0;routeIndex<this.routeDetails.length;routeIndex++){
          if(this.routeDetails[routeIndex].id == id){
              return this.routeDetails[routeIndex];
          }
      }

  }
  openForm(_id=-1): void {
    let  row:any;
    let  id:any;
    if(_id != -1){
      id = _id;
      row = this.findRoute(_id);
    }
    else{
      id = ''
      row = '';
    }

    let dialogRef=this.dialog.open(AddRouteFormComponent, {
      height: '520px',
      disableClose: true,
      width: '600px',
      data: {
        ds: this.routeDetails,
        id: id,
        rowData: row,
      },
    });
      dialogRef.afterClosed().subscribe(() => {
         this.getRoutes()
      });

  }
   private getRoutes(){
        this.routeService.getAllRoutes().subscribe((route)=>{
            this.routeDetails=route;
        })
    }
  removeRow(id: number) {
    if (confirm("Press Ok to confirm the deletion !!!") == true) {
        this.routeService.deleteRoute(id) .subscribe(()=>{this.getRoutes()});
    }
  }
  search() {
    if (
      this.routeDetails.find(
        (obj: any) =>
          obj.departureAirport === this.departureControl.value ||
          obj.arrivalAirport === this.arrivalControl.value
      )
    ) {
      this.temporaryDataSet = this.routeDetails;
      const filterAirportData = this.routeDetails.filter((obj: any) => {
        return (
          obj.departureAirport === this.departureControl.value ||
          obj.arrivalAirport === this.arrivalControl.value
        );
      });
      this.errorMessage = '';
      this.routeDetails = filterAirportData;
    } else {
      this.errorMessage =
        'The Searching route is not available in the system!!!';
    }
  }

  clearSearch() {

    if (this.temporaryDataSet.length)
    {
      this.routeDetails = this.temporaryDataSet;
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
