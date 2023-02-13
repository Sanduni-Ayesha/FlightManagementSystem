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
export class AddRouteFormComponent implements OnInit {

    airport: Airport[] = [];
    filteredDepartures: Airport[] = [];
    filteredArrivals: Airport[] = [];
    routeInfo = new FormGroup({
            id: new FormControl(this.data.rowData.id),
            departureAirport: new FormControl({
                value: this.data.rowData.departureAirport,
                disabled: this.data.disable
            }, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
            arrivalAirport: new FormControl({
                value: this.data.rowData.arrivalAirport,
                disabled: this.data.disable
            }, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
            mileage: new FormControl(this.data.rowData.mileage, [Validators.required, Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')]),
            duration: new FormControl(this.data.rowData.duration, [Validators.required, Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')])
        }, {
            validators: [airportValidator]
        }
    )


    constructor(private airportService: AirportService, private routeService: RouteService, private fb: FormBuilder, private dialog: MatDialog, @Inject(DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.airport = this.data.airportsDetails;
        this.setFilteredDepartureAirport();
        this.setFilteredArrivalAirport();


    }

    onSubmit() {
        let routeInfoData = this.routeInfo.value
        const date = new Date();
        if (this.routeInfo.valid) {
            let route = new Route(
                routeInfoData.id,
                this.getAirportCode(this.routeInfo.get('arrivalAirport')?.value),
                this.getAirportCode(this.routeInfo.get('departureAirport')?.value),
                routeInfoData.mileage,
                routeInfoData.duration,
                this.data.rowData.version,
                date,
                date
            )
            this.routeService.addRoute(route).subscribe({
                next: (response) => {
                    if (response.status == 200) { //OK
                        alert("Route successfully created! new route is now available.");
                    } else if (response.status == 235) { //ROUTE_EXISTS_EXCEPTION
                        alert("Route already exist");
                    }
                },
                error: () => {
                    alert("Oops! Something went wrong.Sorry for the inconvenience")
                }
            });
            this.dialog.closeAll();
        } else {
            alert("Check  again your input details")
        }
    }

    onUpdate() {
        const date = new Date();
        let routeInfoData = this.routeInfo.value
        let route = new Route(
            routeInfoData.id,
            this.getAirportCode(this.routeInfo.get('arrivalAirport')?.value),
            this.getAirportCode(this.routeInfo.get('departureAirport')?.value),
            routeInfoData.mileage,
            routeInfoData.duration,
            this.data.rowData.version,
            this.data.rowData.createdTime,
            date
        )
        if (this.routeInfo.dirty) {
            this.routeService.updateRoute(route).subscribe({
                next: (response) => {
                    if (response.status == 200) { //OK
                        alert("Route successfully updated!");
                    } else if (response.status == 236) { //ROUTE_ALREADY_UPDATED_EXCEPTION

                    }
                }, error: () => {
                    alert("Oops! Something went wrong. Sorry for the inconvenience.");
                }
            });
            this.dialog.closeAll();
        } else {
            this.dialog.closeAll();
        }
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
        if (this.routeInfo.dirty && confirm("Are you sure you want to reset?")) {
            if (this.routeInfo.controls.id.value != '') {
                this.routeInfo.controls.id.setValue(this.data.rowData.id)
                this.routeInfo.controls.departureAirport.setValue(this.data.rowData.departureAirport)
                this.routeInfo.controls.arrivalAirport.setValue(this.data.rowData.arrivalAirport)
                this.routeInfo.controls.mileage.setValue(this.data.rowData.mileage)
                this.routeInfo.controls.duration.setValue(this.data.rowData.duration)
            } else {
                this.routeInfo.controls.departureAirport.setValue('')
                this.routeInfo.controls.arrivalAirport.setValue('')
                this.routeInfo.controls.mileage.setValue('')
                this.routeInfo.controls.duration.setValue('')
            }
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

    private filterAirports(value: String): Airport[] {
        const filterValue = value.toLowerCase();
        if (this.airport) {
            return this.airport.filter((option) =>
                option.airport_name.toLowerCase().includes(filterValue)
            );
        } else {
            return [];
        }
    }

    private getAirportCode(airportName: String): any {
        for (let index = 0; index < this.airport.length; index++) {
            if (this.airport[index].airport_name == airportName) {
                return this.airport[index].airport_code;
            }
        }

    }

    private setFilteredDepartureAirport() {
        this.routeInfo.controls['departureAirport'].valueChanges
            .pipe(map((value) => this.filterAirports(value || '')))
            .subscribe((departures) => {
                this.filteredDepartures = departures;
            });
    }

    private setFilteredArrivalAirport() {
        this.routeInfo.controls['arrivalAirport'].valueChanges
            .pipe(map((value) => this.filterAirports(value || '')))
            .subscribe((arrivals) => {
                this.filteredArrivals = arrivals;
            });
    }
}
