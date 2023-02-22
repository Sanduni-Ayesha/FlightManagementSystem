import {Component, OnInit, Optional} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {AddFlightFormComponent} from '../add-flight-form/add-flight-form.component';
import {MatDialog} from '@angular/material/dialog';
import {Flight} from "../../../model/Flight";
import {FlightDataService} from "../../../services/flight-data/flight-data.service";
import {AirportService} from "../../../services/airport-data/airport.service";
import {Airport} from "../../../model/Airport";
import {ScheduleFlightFormComponent} from "../schedule-flight-form/schedule-flight-form.component";
import {AlertService} from "../../../services/alert/alert.service";
import {SearchFlight} from "../../../model/SearchFlight";
import * as path from "path";

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
    public airportDetails: Airport[] = []
    public flightDetails: Flight[] = [];
    public allFlightDetails: Flight[] = [];
    columnsSchema: any = COLUMNS;
    filteredDepartures: Airport[] | undefined;
    filteredArrivals: Airport[] | undefined;

    searchForm = new FormGroup({
        filterDepart: new FormControl('', [
            Validators.pattern(/^[^0-9]*$/),]),
        filterArrive: new FormControl('', [
            Validators.pattern(/^[^0-9]*$/),
        ]),
        flightNo: new FormControl('', [
            Validators.pattern(/^[a-zA-Z]{2}[0-9]{4}$/),
        ]),
        departureTime: new FormControl(''),
        arrivalTime: new FormControl('')
    })


    constructor(
        private flightService: FlightDataService,
        public dialog: MatDialog,
        private airportService: AirportService,
        private alertService: AlertService,
    ) {
    }

    ngOnInit() {
        this.getAllAirports();
        this.searchForm.controls.filterDepart.valueChanges
            .pipe(map((value) => this.filterAirports(value || '')))
            .subscribe((departures) => {
                this.filteredDepartures = departures;
            });

        this.searchForm.controls.filterArrive.valueChanges
            .pipe(map((value) => this.filterAirports(value || '')))
            .subscribe((arrivals) => {
                this.filteredArrivals = arrivals;
            });
        this.getFlightDetails();
    }

    private getAllAirports() {
        this.airportService.getAllAirports().subscribe((airports) => {
            this.airportDetails = airports;
            for (const airport of airports) {
                this.airports.push(airport.airport_name.toString());
            }
        })
    }

    private filterAirports(value: string): Airport[] {
        const filterValue = value.toLowerCase();
        if (this.airportDetails) {
            return this.airportDetails.filter((port) =>
                port.airport_name.toLowerCase().includes(filterValue)
            );
        } else {
            return [];
        }
    }

    public getAirportNameByAirportCode(airportCode: string): String {
        return this.airportDetails.find(airport => airport.airport_code == airportCode)?.airport_name!;
    }

    public getAirportCodeByAirportName(airportName: string): String {
        return this.airportDetails.find(airport => airport.airport_name == airportName)?.airport_code!;

    }

    filterByAirport() {
        let departure = this.searchForm.controls.filterDepart.value
        if (departure == null) departure = ""
        let arrival = this.searchForm.controls.filterArrive.value
        if (arrival == null) arrival = ""
        if (departure != "") {
            departure = this.getAirportCodeByAirportName(departure!).toString();
        }
        if (arrival != "") {
            arrival = this.getAirportCodeByAirportName(arrival!).toString();
        }
        let searchFlight = new SearchFlight(this.searchForm.value, departure, arrival)
        this.flightService.getAllFlights(searchFlight).subscribe(flights => {
            this.flightDetails = flights
        })
    }

    clearSearch() {
        this.searchForm.reset();
        this.getFlightDetails();
    }

    getFlightDetails() {
        let searchAll = new SearchFlight(this.searchForm.value, "", "")
        this.flightService.getAllFlights(searchAll).subscribe(flights => {
            this.flightDetails = flights
            this.allFlightDetails = flights
        })
    }

    removeFlight(id: number) {
        this.getFlightDetails();
        this.alertService.openConfirmDialog('Confirm', 'Please confirm deleting flight.')
            .afterClosed().subscribe(res => {
            if (res) {
                this.flightService.deleteFlight(id).subscribe({
                    next: (response) => {
                        if (response.status == 238) {
                            this.alertService.warn("Flight already deleted!")
                        } else if (response.status == 237) {
                            this.alertService.warn("No such flight exists")
                        } else {
                            this.alertService.success("Flight deletion successful");
                        }
                        this.getFlightDetails()
                    },
                    error: () => {
                        this.alertService.warn("The deletion process was unsuccessful. Please try again.")
                    }
                });
            }
        })
    }

    openAddFlightForm(type: string, flight = (new Flight(-1, "", "", "", "", "", "", "", "active", 1))) {
        let rowData: Flight = flight;
        if (rowData.departureAirport != "") {
            rowData.departureAirport = this.getAirportNameByAirportCode(flight.departureAirport).toString();
            rowData.arrivalAirport = this.getAirportNameByAirportCode(flight.arrivalAirport).toString();
        }
        let addFlightForm = this.dialog.open(AddFlightFormComponent, {
            disableClose: true,
            data: {
                flightData: this.flightDetails,
                row: flight,
                airportNames: this.airports,
                airports: this.airportDetails
            },
        });
        addFlightForm.afterClosed().subscribe(() => {
                this.getFlightDetails();
                this.searchForm.controls.filterDepart.reset();
                this.searchForm.controls.filterArrive.reset();
            }
        )
    }

    openScheduleFlightForm() {
        let scheduleFlightForm = this.dialog.open(ScheduleFlightFormComponent, {
            disableClose: true,
            data: {
                airportNames: this.airports,
                airports: this.airportDetails
            }
        });
        scheduleFlightForm.afterClosed().subscribe(() => {
                this.getFlightDetails();
                this.searchForm.controls.filterDepart.reset();
                this.searchForm.controls.filterArrive.reset();
            }
        )
    }

    airportEqualWarning(): boolean {
        if (this.searchForm.controls.filterDepart.getRawValue() == this.searchForm.controls.filterArrive.getRawValue() && this.searchForm.controls.filterDepart.getRawValue() != "" && this.searchForm.controls.filterArrive.dirty && this.searchForm.controls.filterDepart.dirty) {
            return true;
        }
        return false;
    }

    disableSearch(): boolean {
        if (this.searchForm.invalid) {
            return true
        }
        return false;
    }

    disableClear(): boolean {
        if (!this.searchForm.dirty) {
            return true;
        }
        return false;
    }
}
