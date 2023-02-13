import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { airportValidator } from '../../../shared/airport.validator';
import { dateValidator } from '../../../shared/date.validator';
import { futureDateValidator } from '../../../shared/futureDate.validator';
import { map } from 'rxjs/operators';
import {FlightDataService} from "../../../services/flight-data/flight-data.service";
import {Flight} from "../../../model/Flight";
import {Airport} from "../../../model/Airport";

@Component({
  selector: 'app-add-flight-form',
  templateUrl: './add-flight-form.component.html',
  styleUrls: ['../../../styles/form-overlay.scss'],
})
export class AddFlightFormComponent implements OnInit {

  filteredDepartures: Airport[]=[];
  filteredArrivals: Airport[]=[];
  flightForm = new FormGroup(
      {
        id: new FormControl(''),
        departureAirport: new FormControl('', [
          Validators.required,
        ]),
        arrivalAirport: new FormControl('', [
          Validators.required,
        ]),
        flightNo: new FormControl('',[
          Validators.required,
          Validators.pattern(/^[a-zA-Z]{2}[0-9]{4}$/),
        ]),
        departureTime: new FormControl('',[
          Validators.required,
        ]),
        arrivalTime: new FormControl('',[
          Validators.required,
        ]),
      },
      { validators: [airportValidator, dateValidator, futureDateValidator] }

  );

  constructor(
    public dialog: MatDialog,
    @Inject(DIALOG_DATA) public data: any,
    private flightService: FlightDataService ,
  ) {}
  ngOnInit() {
    this.flightForm.patchValue(this.data.row)
    this.flightForm.controls['departureAirport'].valueChanges
      .pipe(map((value) => this.filterAirports(value || '')))
      .subscribe((departures) => {
        this.filteredDepartures = departures;
      });
    this.flightForm.controls['arrivalAirport'].valueChanges
      .pipe(map((value) => this.filterAirports(value || '')))
      .subscribe((arrivals) => {
        this.filteredArrivals = arrivals;
      });
  }

  private filterAirports(value: string): Airport[] {
    const filterValue = value.toLowerCase();
    if (this.data.airports) {
      return this.data.airports.filter((port: { airport_name: string; }) =>
        port.airport_name.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }

  createNewFlight() {
    let f = this.flightForm.value
    let lastID  = this.data.flightData[(this.data.flightData.length-1)].id;
    let newFlight = new Flight((lastID+1), <string>f.departureAirport, <string>f.arrivalAirport,<string>f.flightNo,<string>f.departureTime,<string>f.arrivalTime);
    if (this.checkFlightExistence(newFlight)){
        alert("The flight is already used in the given time!\n Please use a different time.")
    }else {
        this.flightService.addFlight(newFlight).subscribe({next: (response) =>{
            if (response.status==239){
                alert("The flight is already used in the given time!\n Please use a different time.")
            }else if (response.status==240){
                alert("Flight details are invalid. Please enter valid details.")
            }else{
                alert("Flight creation successful.")
            }
        },error: ()=>{
                alert("The flight creation process was unsuccessful. Please try again.");
            }});
        this.dialog.closeAll();
    }
  }

  checkFlightExistence(flight: Flight):boolean{
      let id = flight.id;
      let flightNo = flight.flightNo;
      let departureTime = new Date(flight.departureTime);
      let arrivalTime = new Date(flight.arrivalTime);

      for (const flightData of this.data.flightData) {
          let departure = new Date(flightData.departureTime);
          let arrival = new Date(flightData.arrivalTime);

          if (flightData.id!=id && flightNo==flightData.flightNo && (departure.toString() == departureTime.toString() || arrival.toString()==arrivalTime.toString())){
              return true;
          }
      }
      return false;
  }

  close(dirty: boolean) {
    if (!dirty) {
      this.dialog.closeAll();
    } else if (confirm('Are you sure you want to cancel?')) {
      this.dialog.closeAll();
    }
  }
  resetRow() {
    this.flightForm.patchValue(this.data.row);
  }

  updateFlight(dirty: boolean) {
    const updatedId = this.data.row.id;
    if (dirty) {
        if (updatedId != null) {
          let f = this.flightForm.value;
          let departureCode = this.data.airports.find((airport: { airport_name: string | null | undefined; })=>airport.airport_name==f.departureAirport).airport_code;
          let arrivalCode = this.data.airports.find((airport: { airport_name: string | null | undefined; })=>airport.airport_name==f.arrivalAirport).airport_code;
          let newFlight = new Flight(updatedId, departureCode, arrivalCode,<string>f.flightNo,<string>f.departureTime,<string>f.arrivalTime);
          if (this.checkFlightExistence(newFlight)){
              alert("The flight is already used in the given time!\n Please use a different time.")
          }else{
              this.flightService.updateFlight(newFlight).subscribe({next:(response)=> {
                      if (response.status == 241) {
                          alert("Flight is already updated by another user.")
                          this.resetRow()
                      } else if (response.status == 239) {
                          alert("The flight is already used in the given time!\n Please use a different time.")
                      } else if (response.status == 240) {
                          alert("Flight details are invalid. Please enter valid details.")
                      } else if (response.status == 237) {
                          alert("Flight does not exist to be updated.")
                      } else {
                          alert("Flight update successful.")
                      }
                  },
                      error: ()=>{
                          alert("The flight updating process was unsuccessful. Please try again.");
                      }
              });
              this.dialog.closeAll();
          }
        }
    }
  }
}
