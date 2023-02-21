import {Component, Inject, OnInit} from '@angular/core';
import {Airport} from "../../../model/Airport";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {airportValidator} from "../../../shared/airport.validator";
import {MatDialog} from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {Schedule} from "../../../model/Schedule";
import {FlightDataService} from "../../../services/flight-data/flight-data.service";
import {futureDateValidator} from "../../../shared/futureDate.validator";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
    selector: 'app-schedule-flight-form',
    templateUrl: './schedule-flight-form.component.html',
    styleUrls: ['../../../styles/form-overlay.scss']
})
export class ScheduleFlightFormComponent implements OnInit {
    filteredDepartures: Airport[] = [];
    filteredArrivals: Airport[] = [];
    scheduleForm = new FormGroup(
        {
            startDate: new FormControl(new Date(), [
                Validators.required,
            ]),
            endDate: new FormControl(new Date(), [
                Validators.required,
            ]),
            departureAirport: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[^0-9]*$/),
            ]),
            arrivalAirport: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[^0-9]*$/),
            ]),
            flightNo: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[a-zA-Z]{2}[0-9]{4}$/),
            ]),
            departureTime: new FormControl(new Date(), [
                Validators.required,
            ]),
            arrivalTime: new FormControl(new Date(), [
                Validators.required,
            ]),
        },
        {validators: [airportValidator, futureDateValidator]}
    );

    dayForm = new FormGroup({
        monday: new FormControl(false),
        tuesday: new FormControl(false),
        wednesday: new FormControl(false),
        thursday: new FormControl(false),
        friday: new FormControl(false),
        saturday: new FormControl(false),
        sunday: new FormControl(false)
    })

    constructor(
        public dialog: MatDialog,
        @Inject(DIALOG_DATA) public data: any,
        private flightService: FlightDataService,
        private alertService: AlertService,
    ) {
    }

    ngOnInit() {
        this.scheduleForm.controls['departureAirport'].valueChanges
            .pipe(map((value) => this.filterAirports(value || '')))
            .subscribe((departures) => {
                this.filteredDepartures = departures;
            });
        this.scheduleForm.controls['arrivalAirport'].valueChanges
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

    scheduleFlights() {
        let formValues = this.scheduleForm.value;
        let departureCode = this.data.airports.find((airport: { airport_name: string | null | undefined; }) => airport.airport_name == formValues.departureAirport).airport_code;
        let arrivalCode = this.data.airports.find((airport: { airport_name: string | null | undefined; }) => airport.airport_name == formValues.arrivalAirport).airport_code;
        let days = this.getDays();
        let schedule = new Schedule(<Date>formValues.startDate,
            <Date>formValues.endDate,
            departureCode,
            arrivalCode,
            <string>formValues.flightNo,
            <Date>formValues.departureTime,
            <Date>formValues.arrivalTime,
            new Date(),
            days)

        this.flightService.scheduleFlight(schedule).subscribe({
            next: (response) => {
                if(response.body!=null){
                    this.alertService.openConfirmDialog("Duplicate Flight Detected",
                        "The flight with following data was duplicated. \nFlight No : "
                        +response.body.flightNo+"\nDeparture Time : "+response.body.departureTime+
                    "\nFlight scheduling unsuccessful.");
                }
                if (response.status == 245) {
                    this.alertService.warn("The flight schedule data is invalid. Please retry.")
                } else if (response.status == 234) {
                    this.alertService.warn("The entered route does not exist.\nPlease use a flight with an available route.")
                } else if(response.status==200 && response.body==null){
                    this.alertService.success("Flight scheduling successful.")
                }
            }, error: () => {
                this.alertService.warn("The flight scheduling process was unsuccessful. Please try again.")
            }
        });
        this.dialog.closeAll();

    }

    private getDays() {
        let formValues = this.dayForm.value;
        let days: string[] = [];
        if (formValues.monday) days.push("MONDAY");
        if (formValues.tuesday) days.push("TUESDAY");
        if (formValues.wednesday) days.push("WEDNESDAY");
        if (formValues.thursday) days.push("THURSDAY");
        if (formValues.friday) days.push("FRIDAY");
        if (formValues.saturday) days.push("SATURDAY");
        if (formValues.sunday) days.push("SUNDAY");
        return days;
    }

    closeScheduleForm(dirty: boolean) {
        if (!dirty) {
            this.dialog.closeAll();
        }else{
            this.alertService.openConfirmDialog("Cancel", "Are you sure you want to cancel?")
                .afterClosed().subscribe(res=>{
                if(res){
                    this.dialog.closeAll();
                }
            })
        }
    }

    disableReset(): boolean {
        if (this.scheduleForm.dirty) {
            return false;
        }
        return true;
    }

    disableSubmit(): boolean {
        let day = (this.dayForm.controls['monday'].value ||
            this.dayForm.controls['tuesday'].value ||
            this.dayForm.controls['wednesday'].value ||
            this.dayForm.controls['thursday'].value ||
            this.dayForm.controls['friday'].value ||
            this.dayForm.controls['saturday'].value ||
            this.dayForm.controls['sunday'].value)
        let dateEqual = this.scheduleForm.controls['startDate'].value?.getDate()!=this.scheduleForm.controls['endDate'].value?.getDate()
        let timeEqual = this.scheduleForm.controls['departureTime'].value!=this.scheduleForm.controls['arrivalTime'].value
        if (this.scheduleForm.valid && day && dateEqual && timeEqual) {
            return false;
        }
        return true;
    }
}
