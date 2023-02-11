import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, ɵElement, ɵValue} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddRouteFormComponent } from '../add-route-form/add-route-form.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Route} from "../../../model/Route";
import {RouteService} from "../../../services/route-data/route.service";
import {AirportService} from "../../../services/airport-data/airport.service";
import {Airport} from "../../../model/Airport";


const TableHeading = ['Departure Airport','Arrival Airport','Mileage/Km','Duration/Hours']

@Component({
  selector: 'app-route-screen',
  templateUrl: './route-screen.component.html',
  styleUrls: ['../../../styles/main-screen.scss'],
})
export class RouteScreenComponent implements OnInit {
  routeTableHeading: any = TableHeading;
  arrivalControl = new FormControl('',[Validators.pattern('^$|[a-zA-Z]+')]);
  departureControl = new FormControl('',[Validators.pattern('^$|[a-zA-Z]+')]);
  filteredArrivalAirport: Airport[] =[];
  filteredDepartureAirport: Airport[] =[];
  errorMessage: string | undefined;
 public airportsNames: String[] =[]
 public routeDetails:Route[] = [];
 public airportDetails:Airport[]=[]

  constructor(private airportService:AirportService,private routeService: RouteService , public dialog: MatDialog , private http:HttpClient) {}

  ngOnInit() {
    this.getAllAirports();
    this.setFilteredArrivalAirport();
    this.setFilteredDepartureAirport();
    this.getRoutes("","")
  }
  private setFilteredArrivalAirport(){
      this.arrivalControl.valueChanges.pipe(
          startWith(''),
          map((value) => this.filterAirport(value || '')))
          .subscribe((arrivals) => {
              this.filteredArrivalAirport = arrivals;
          });
  }
  private setFilteredDepartureAirport(){
      this.departureControl.valueChanges.pipe(
          startWith(''),
          map((value) =>
              this.filterAirport(value || ''))).subscribe((departures) => {
          this.filteredDepartureAirport = departures;
      });
    }
    private filterAirport(value: String): Airport[] {
    const filterValue = value.toLowerCase();
    if (this.airportDetails) {
      return this.airportDetails.filter((option) =>
        option.airport_name.toLowerCase().includes(filterValue)
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
        airportsNames:this.airportsNames,
        airportsDetails:this.airportDetails,
        allRoutes:this.routeDetails,
      },
    });
      dialogRef.afterClosed().subscribe(() => {
         this.getRoutes("","")
      });

  }
   private getRoutes(departureAirport:string,arrivalAirport:string){
        this.routeService.getAllRoutes(departureAirport,arrivalAirport).subscribe((route)=>{
            this.routeDetails=route;
            if(this.routeDetails.length==0){
                this.errorMessage = "Sorry,there are no route available that match your search criteria";
            }
            else{
                this.errorMessage='';
            }
        })
    }
  removeRow(id: number) {
    if (confirm("Press Ok to confirm the deletion !!!") == true) {
        this.routeService.deleteRoute(id) .subscribe(()=>{this.getRoutes("","")});
    }
  }
  search() {
     if (this.departureControl.valid && this.arrivalControl.valid){
         let departureAirportCode="";
         let arrivalAirportCode="";
         if(this.departureControl.value != '' ){
             departureAirportCode=this.getAirportCodeByAirportName(this.departureControl.value);
         }
         if(this.arrivalControl.value != ''){
             arrivalAirportCode=this.getAirportCodeByAirportName(this.arrivalControl.value);
         }
         this.getRoutes(departureAirportCode,arrivalAirportCode)
     }
     else{
         this.errorMessage='';
     }
  }

  clearSearch() {
      this.errorMessage = '';
      this.departureControl.setValue('');
      this. arrivalControl.setValue('')
      this.getRoutes("","");
  }

    private getAllAirports(){
        this.airportService.getAllAirports().subscribe((airport)=>{
            this.airportDetails=airport;
            this.getAllAirportNames();
        })
    }
    private getAllAirportNames(){
        this.airportDetails.forEach((airport)=>{
            this.airportsNames.push(airport.airport_name);
        });

    }
    public getAirportNameByAirportCode(airportCode:String):any{
     for(let airport of this.airportDetails){
         if (airport.airport_code==airportCode){
             return airport.airport_name;
         }

     }
    }
    public getAirportCodeByAirportName(airportName:any):any{
       return this.airportDetails.find(airport=>airport.airport_name==airportName)?.airport_code;

        }




}
