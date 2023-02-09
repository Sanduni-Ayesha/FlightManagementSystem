import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map} from 'rxjs/operators';
import {AddFlightFormComponent} from '../add-flight-form/add-flight-form.component';
import {MatDialog} from '@angular/material/dialog';
import {Flight} from "../../../model/Flight";
import {FlightDataService} from "../../../services/flight-data/flight-data.service";
import {AirportService} from "../../../services/airport-data/airport.service";
import {Airport} from "../../../model/Airport";

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
    filteredDepartures: string[] | undefined;
    filteredArrivals: string[] | undefined;
    filterDepart = new FormControl('');
    filterArrive = new FormControl('');

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

    private filterAirports(value: string): string[] {
        const filterValue = value.toLowerCase();
        if (this.airports) {
            return this.airports.filter((option) =>
                option.toLowerCase().includes(filterValue)
            );
        } else {
            return [];
        }
    }

    public getAirportName(code: string): String {
        return this.airportDetails?.find(airport => airport.airport_code == code)?.airport_name!;
    }

    filterByAirport(departure: string, arrive: string) {
        if (departure == '' && arrive == '') {
            this.filterDepart.reset();
            this.filterArrive.reset();
            this.getFlightDetails();
        }
        if (departure != '') {
            this.flightDetails = this.flightDetails.filter(
                (data: any) => data.departureAirport == departure
            );
        }
        if (arrive != '') {
            this.flightDetails = this.flightDetails.filter(
                (data: any) => data.arrivalAirport == arrive
            );
        }
    }

    getFlightDetails() {
        this.flightService.getAllFlights().subscribe(flights => {
            for (const flight of flights) {

                //flight.departureAirport = this.airportDetails.find(airport =>{airport.airport_code==flight.departureAirport}).airport_name
            }
            this.flightDetails = flights
            this.allFlightDetails = flights
        })
    }

    removeFlight(id: number) {
        this.getFlightDetails();
        if (confirm('Please confirm deleting')) {
            this.flightService.deleteFlight(id).subscribe(() => this.getFlightDetails());
        }
    }

    openAddFlightForm(type: string, flight = (new Flight(-1, "", "", "", "", ""))) {
        let rowData: Flight = flight;
        this.getFlightDetails();
        if (rowData.departureAirport != "") {
            rowData.departureAirport = this.getAirportName(flight.departureAirport).toString();
            rowData.arrivalAirport = this.getAirportName(flight.arrivalAirport).toString();
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
}
