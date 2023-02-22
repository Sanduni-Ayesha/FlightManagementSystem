import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DIALOG_DATA} from '@angular/cdk/dialog';
import {airportValidator} from '../../../shared/airport.validator';
import {dateValidator} from '../../../shared/date.validator';
import {futureDateValidator} from '../../../shared/futureDate.validator';
import {map} from 'rxjs/operators';
import {FlightDataService} from "../../../services/flight-data/flight-data.service";
import {Flight} from "../../../model/Flight";
import {Airport} from "../../../model/Airport";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
    selector: 'app-add-flight-form',
    templateUrl: './add-flight-form.component.html',
    styleUrls: ['../../../styles/form-overlay.scss'],
})
export class AddFlightFormComponent implements OnInit {

    filteredDepartures: Airport[] = [];
    filteredArrivals: Airport[] = [];
    flightForm = new FormGroup(
        {
            id: new FormControl(''),
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
            departureTime: new FormControl('', [
                Validators.required,
            ]),
            arrivalTime: new FormControl('', [
                Validators.required,
            ]),
        },
        {validators: [airportValidator, dateValidator, futureDateValidator]}
    );

    constructor(
        public dialog: MatDialog,
        @Inject(DIALOG_DATA) public data: any,
        private flightService: FlightDataService,
        private alertService: AlertService
    ) {
    }

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
        let lastID = this.data.flightData[(this.data.flightData.length - 1)].id;
        let departureCode = this.data.airports.find((airport: { airport_name: string | null | undefined; }) => airport.airport_name == f.departureAirport).airport_code;
        let arrivalCode = this.data.airports.find((airport: { airport_name: string | null | undefined; }) => airport.airport_name == f.arrivalAirport).airport_code;
        let newFlight = new Flight((lastID + 1), departureCode, arrivalCode, <string>f.flightNo, <string>f.departureTime, <string>f.arrivalTime, "", "", "active", 1)
        if (this.checkFlightDuplication(newFlight)) {
            this.alertService.warn("The flight is already reserved for the day!\n Please use a different flight designator.");
        } else {
            this.flightService.addFlight(newFlight).subscribe({
                next: (response) => {
                    if (response.status == 239) {
                        this.alertService.warn("The flight is already reserved for the day!\n Please use a different flight designator.")
                    } else if (response.status == 240) {
                        this.alertService.warn("Flight details are invalid. Please enter valid details.")
                    } else if (response.status == 233) {
                        this.alertService.warn("The entered route does not exist. Please add route first.")
                    } else {
                        this.alertService.success("Flight creation successful.")
                        this.dialog.closeAll();
                    }
                }, error: () => {
                    this.alertService.warn("The flight creation process was unsuccessful. Please try again.")
                }
            });
        }
    }

    checkFlightDuplication(flight: Flight): boolean {
        let id = flight.id;
        let flightNo = flight.flightNo;
        let departureTime = new Date(flight.departureTime).getDate();

        for (const flightData of this.data.flightData) {
            let departure = new Date(flightData.departureTime).getDate();
            if (flightData.id == id) {
                continue;
            }
            if (flightData.flightNo == flightNo && departure == departureTime) {
                return true;
            }
        }
        return false;
    }

    close(dirty: boolean) {
        if (!dirty) {
            this.dialog.closeAll();
        } else {
            this.alertService.openConfirmDialog("Cancel", "Are you sure you want to cancel?")
                .afterClosed().subscribe(res => {
                if (res) {
                    this.dialog.closeAll();
                }
            })
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
                let departureCode = this.data.airports.find((airport: { airport_name: string | null | undefined; }) => airport.airport_name == f.departureAirport).airport_code;
                let arrivalCode = this.data.airports.find((airport: { airport_name: string | null | undefined; }) => airport.airport_name == f.arrivalAirport).airport_code;
                let newFlight = new Flight(updatedId, departureCode, arrivalCode, <string>f.flightNo, <string>f.departureTime, <string>f.arrivalTime, this.data.row.createdTime, this.data.row.lastUpdatedTime, this.data.row.status, this.data.row.version);
                if (this.checkFlightDuplication(newFlight)) {
                    this.alertService.warn("The flight is already reserved for the day!\n Please use a different flight designator.")
                } else {
                    this.flightService.updateFlight(newFlight).subscribe({
                        next: (response) => {
                            if (response.status == 241) {
                                this.alertService.warn("Flight is already updated by another user.")
                                this.resetRow()
                            } else if (response.status == 239) {
                                this.alertService.warn("The flight is already reserved for the day!\n Please use a different flight designator.")
                            } else if (response.status == 240) {
                                this.alertService.warn("Flight details are invalid. Please enter valid details.")
                            } else if (response.status == 237) {
                                this.alertService.warn("Flight does not exist to be updated.")
                            } else {
                                this.alertService.success("Flight update successful.")
                            }
                        },
                        error: () => {
                            this.alertService.warn("The flight updating process was unsuccessful. Please try again.")
                        }
                    });
                    this.dialog.closeAll();
                }
            }
        }
    }

    disableReset(): boolean {
        if (this.flightForm.dirty) {
            return false;
        }
        return true;
    }
}
