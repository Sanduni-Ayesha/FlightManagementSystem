import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, ɵElement, ɵValue} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddRouteFormComponent} from '../add-route-form/add-route-form.component';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Route} from "../../../model/Route";
import {RouteService} from "../../../services/route-data/route.service";
import {AirportService} from "../../../services/airport-data/airport.service";
import {Airport} from "../../../model/Airport";
import {AlertService} from "../../../services/alert/alert.service";


const TableHeading = ['Departure Airport', 'Arrival Airport', 'Mileage/Km', 'Duration/Hours', 'Edit', 'Delete']

@Component({
    selector: 'app-route-screen',
    templateUrl: './route-screen.component.html',
    styleUrls: ['../../../styles/main-screen.scss'],
})
export class RouteScreenComponent implements OnInit {
    routeTableHeading: any = TableHeading;
    arrivalControl = new FormControl('', [Validators.pattern(/^[^0-9]*$/)]);
    departureControl = new FormControl('', [Validators.pattern(/^[^0-9]*$/)]);
    filteredArrivalAirport: Airport[] = [];
    filteredDepartureAirport: Airport[] = [];
    errorMessage: string | undefined;
    public airportsNames: String[] = []
    public routeDetails: Route[] = [];
    public airportDetails: Airport[] = []

    constructor(private airportService: AirportService,
                private routeService: RouteService,
                public dialog: MatDialog,
                private http: HttpClient,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.getAllAirports();
        this.setFilteredArrivalAirport();
        this.setFilteredDepartureAirport();
        this.getRoutes("", "")
    }

    private setFilteredArrivalAirport() {
        this.arrivalControl.valueChanges.pipe(
            startWith(''),
            map((value) => this.filterAirport(value || '')))
            .subscribe((arrivals) => {
                this.filteredArrivalAirport = arrivals;
            });
    }

    private setFilteredDepartureAirport() {
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

    private findRoute(id: number): any {
        let routeIndex = 0
        for (routeIndex = 0; routeIndex < this.routeDetails.length; routeIndex++) {
            if (this.routeDetails[routeIndex].id == id) {
                return this.routeDetails[routeIndex];
            }
        }
    }

    openForm(status: string, routeId: number): void {
        this.setPageDefault();
        let route: any;
        let id: any;
        let disableStatus: boolean = false;
        if (status == "update") {
            id = routeId;
            route = this.findRoute(routeId);
            route.arrivalAirport = this.getAirportNameByAirportCode(route.arrivalAirport);
            route.departureAirport = this.getAirportNameByAirportCode(route.departureAirport);
            disableStatus = true;
        } else if (status == "create") {
            this.getRoutes("", "")
            id = ''
            route = '';
            disableStatus = false;
        }

        let dialogRef = this.dialog.open(AddRouteFormComponent, {
            height: '520px',
            disableClose: true,
            width: '600px',
            data: {
                ds: this.routeDetails,
                id: id,
                rowData: route,
                airportsDetails: this.airportDetails,
                allRoutes: this.routeDetails,
                disable: disableStatus,
            },
        });
        dialogRef.afterClosed().subscribe(() => {
            this.getRoutes("", "");
            this.setPageDefault();
        });

    }

    private getRoutes(departureAirport: string, arrivalAirport: string) {
        this.routeService.getAllRoutes(departureAirport, arrivalAirport).subscribe({
            next: (route) => {
                this.routeDetails = route;
                if (this.routeDetails.length == 0) {
                    this.errorMessage = "Sorry,there are no route available that match your search criteria";
                } else {
                    this.errorMessage = '';
                }
            }, error: () => {
                this.alertService.warn("Oops! Something went wrong.Sorry for the inconvenience")
            }
        })
    }

    removeRow(id: number) {
        this.alertService.openConfirmDialog('Confirm', "Are you sure you want to delete this route?")
            .afterClosed().subscribe(res => {
            if (res) {
                this.routeService.deleteRoute(id).subscribe({
                    next:
                        (response) => {
                            this.getRoutes("", "");
                            if (response.status == 239) {// FLIGHT_EXISTS_EXCEPTION
                                this.alertService.warn("Unable to delete route.There existing" +
                                    " flight associated with this route")
                            } else if (response.status == 233) { // ROUTE_NOT_EXISTS_EXCEPTION
                                this.alertService.warn("Route already deleted")
                            } else if (response.status == 200) { //OK
                                this.alertService.success("Route successfully deleted!")
                            }
                        }, error: () => {
                        this.alertService.warn("Oops! Something went wrong.Sorry for the inconvenience")
                    }
                });
            }
        })
    }

    search() {
        if (this.departureControl.valid && this.arrivalControl.valid) {
            let departureAirportCode = "";
            let arrivalAirportCode = "";
            if (this.departureControl.value != '') {
                departureAirportCode = this.getAirportCodeByAirportName(this.departureControl.value);
            }
            if (this.arrivalControl.value != '') {
                arrivalAirportCode = this.getAirportCodeByAirportName(this.arrivalControl.value);
            }
            this.getRoutes(departureAirportCode, arrivalAirportCode)
        } else {
            this.errorMessage = '';
        }
    }

    clearSearch() {
        this.setPageDefault();
    }

    private getAllAirports() {
        this.airportService.getAllAirports().subscribe((airport) => {
            this.airportDetails = airport;
        })
    }

    public getAirportNameByAirportCode(airportCode: String): any {
        for (let airport of this.airportDetails) {
            if (airport.airport_code == airportCode) {
                return airport.airport_name;
            }
        }
    }

    public getAirportCodeByAirportName(airportName: any): any {
        return this.airportDetails.find(airport => airport.airport_name == airportName)?.airport_code;

    }

    public setPageDefault() {
        this.errorMessage = '';
        this.departureControl.reset();
        this.arrivalControl.reset();
        this.getRoutes("", "");
    }


}
