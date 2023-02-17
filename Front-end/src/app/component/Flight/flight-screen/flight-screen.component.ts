import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {AddFlightFormComponent} from '../add-flight-form/add-flight-form.component';
import {MatDialog} from '@angular/material/dialog';
import {Flight} from "../../../model/Flight";
import {FlightDataService} from "../../../services/flight-data/flight-data.service";
import {AirportService} from "../../../services/airport-data/airport.service";
import {Airport} from "../../../model/Airport";
import {ScheduleFlightFormComponent} from "../schedule-flight-form/schedule-flight-form.component";

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
    filterDepart = new FormControl('', [
        Validators.pattern(/^[^0-9]*$/),]);
    filterArrive = new FormControl('', [
        Validators.pattern(/^[^0-9]*$/),
    ]);

    constructor(
        private flightService: FlightDataService,
        public dialog: MatDialog,
        private airportService: AirportService
    ) {
    }

    ngOnInit() {
        this.getAllAirports();
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
        let departure = this.getAirportCodeByAirportName(this.filterDepart.value!);
        let arrival = this.getAirportCodeByAirportName(this.filterArrive.value!);
        if (this.filterDepart.value == '') departure = "";
        if (this.filterArrive.value == '') arrival = "";
        this.flightService.getAllFlights(departure.toString(), arrival.toString()).subscribe(flights => {
            this.flightDetails = flights
        })
    }

    clearSearch() {
        this.filterDepart.setValue("");
        this.filterArrive.setValue("");
        this.getFlightDetails();
    }

    getFlightDetails() {
        this.flightService.getAllFlights("", "").subscribe(flights => {
            this.flightDetails = flights
            this.allFlightDetails = flights
        })
    }

    removeFlight(id: number) {
        this.getFlightDetails();
        if (confirm('Please confirm deleting')) {
            this.flightService.deleteFlight(id).subscribe({
                next: (response) => {
                    if (response.status == 238) {
                        alert("Flight already deleted!")
                    } else if (response.status == 237) {
                        alert("No such flight exists")
                    } else {
                        alert("Flight deletion successful!")
                    }
                    this.getFlightDetails()
                },
                error: () => {
                    alert("The deletion process was unsuccessful. Please try again.");
                }
            });
        }
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
                this.filterDepart.reset();
                this.filterArrive.reset();
            }
        )
    }

    openScheduleFlightForm() {
        this.dialog.open(ScheduleFlightFormComponent,{
            disableClose: true,
            data:{
                airportNames: this.airports,
                airports: this.airportDetails
            }
        })
    }

    airportEqualWarning(): boolean {
        if (this.filterDepart.getRawValue() == this.filterArrive.getRawValue() && this.filterDepart.getRawValue()!="" && this.filterArrive.dirty && this.filterDepart.dirty) {
            return true;
        }
        return false;
    }

    disableSearch(): boolean {
        if (this.filterDepart.invalid || this.filterArrive.invalid || this.filterDepart.getRawValue() == this.filterArrive.getRawValue()) {
            return true
        }
        return false;
    }

    disableClear(): boolean {
        if (!this.filterArrive.dirty && !this.filterDepart.dirty) {
            return true;
        }
        return false;
    }
}
