import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {airportValidator} from "../../../shared/airport.validator";
import {RouteService} from "../../../services/route-data/route.service";
import {Route} from "../../../model/Route";
import {Airport} from "../../../model/Airport";
import {AirportService} from "../../../services/airport-data/airport.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-add-route-form',
  templateUrl: './add-route-form.component.html',
  styleUrls: ['../../../styles/form-overlay.scss']
})
export class AddRouteFormComponent implements OnInit{

  airportsNames: String[] = [];
  airport:Airport[]=[];
  filteredDepartures: String[] | undefined;
  filteredArrivals: String[] | undefined;
  routeInfo = new FormGroup({
      id: new FormControl(this.data.rowData.id),
      departureAirport: new FormControl(this.data.rowData.departureAirport, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      arrivalAirport: new FormControl(this.data.rowData.arrivalAirport, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      mileage: new FormControl(this.data.rowData.mileage, [Validators.required, Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')]),
      duration: new FormControl(this.data.rowData.duration, [Validators.required, Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')])
    }, {
      validators: [airportValidator]
    }
  )


  constructor(private airportService:AirportService,private routeService: RouteService , private fb: FormBuilder, private dialog: MatDialog, @Inject(DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.airportsNames=this.data.airportsNames;
    this.airport=this.data.airportsDetails;
    console.log(this.airportsNames)
    this.routeInfo.controls['departureAirport'].valueChanges
        .pipe(map((value) => this.filterAirports(value || '')))
        .subscribe((departures) => {
          this.filteredDepartures = departures;
        });

    this.routeInfo.controls['arrivalAirport'].valueChanges
        .pipe(map((value) => this.filterAirports(value || '')))
        .subscribe((arrivals) => {
          this.filteredArrivals = arrivals;
        });
  }
  onSubmit() {
    if (confirm('Are you sure you want to add the new route?') == true){
      let routeInfoData = this.routeInfo.value
      const date = new Date();
      let route = new Route(
          routeInfoData.id,
          this.getAirportCode(routeInfoData.arrivalAirport),
          this.getAirportCode(routeInfoData.departureAirport),
          routeInfoData.mileage,
          routeInfoData.duration,
          this.data.rowData.version,
          date,
          date

      )
      this.routeService.addRoute(route).subscribe();
    }
    this.dialog.closeAll();
  }

  onUpdate() {
    const date = new Date();
    let data1:Date = this.data;
    if (this.routeInfo.dirty) {
    if (confirm('Are you sure you want to update the data?') == true) {
      let routeInfoData = this.routeInfo.value
      let route = new Route(
          routeInfoData.id,
          this.getAirportCode(routeInfoData.arrivalAirport),
          this.getAirportCode(routeInfoData.departureAirport),
          routeInfoData.mileage,
          routeInfoData.duration,
          this.data.rowData.version,
          this.data.rowData.createdTime,
          date

      )
     this.routeService.updateRoute(route).subscribe();
    }}
    this.dialog.closeAll();
  }

  onCancel() {
    if (this.routeInfo.dirty) {
      if (confirm('Are you sure you want to cancel?') == true) {
        this.dialog.closeAll();
      }
    } else {
      this.dialog.closeAll();
    }

  }

  onReset() {
    if(this.routeInfo.controls.id.value != '' ) {
      this.routeInfo.controls.id.setValue(this.data.ds[this.data.id - 1].id)
      this.routeInfo.controls.departureAirport.setValue(this.data.ds[this.data.id - 1].departureAirport)
      this.routeInfo.controls.arrivalAirport.setValue(this.data.ds[this.data.id - 1].arrivalAirport)
      this.routeInfo.controls.mileage.setValue(this.data.ds[this.data.id - 1].mileage)
      this.routeInfo.controls.duration.setValue(this.data.ds[this.data.id - 1].duration)
    }
    else{
      this.routeInfo.controls.departureAirport.setValue('')
      this.routeInfo.controls.arrivalAirport.setValue('')
      this.routeInfo.controls.mileage.setValue('')
      this.routeInfo.controls.duration.setValue('')
    }
  }

  get addedDepartureAirport() {
    return this.routeInfo.get('departureAirport')
  }

  get addedArrivalAirport() {
    return this.routeInfo.get('arrivalAirport')
  }

  get addedMileage() {
    return this.routeInfo.get('mileage')
  }

  get addedDuration() {
    return this.routeInfo.get('duration')
  }

  private filterAirports(value: String): String[] {
    const filterValue = value.toLowerCase();
    if (this.airportsNames) {
      return this.airportsNames.filter((option) =>
          option.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }
  private getAirportCode(airportName:String):any{
    for(let index = 0;index < this.airport.length;index++){
      if(this.airport[index].airport_name == airportName){
        return this.airport[index].airport_code;
      }
    }

  }

}
