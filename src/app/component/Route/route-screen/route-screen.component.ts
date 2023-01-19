import {Component, OnInit} from '@angular/core';
import {FormControl, ɵElement, ɵValue} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AddRouteFormComponent} from "../add-route-form/add-route-form.component";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

const userData = [
  {id: 1, departureAirport: "Colombo", arrivalAirport: "Dubai", mileage: "36", duration: "20"},
  {id: 2, departureAirport: "London", arrivalAirport: "Colombo", mileage: "280", duration: "20"},
  {id: 3, departureAirport: "Katunayaka", arrivalAirport: "Tokyo", mileage: "287", duration: "220"},
  {id: 4, departureAirport: "Singapore", arrivalAirport: "Doha", mileage: "283", duration: "260"}
];
const columnSchema = [
  {
    key: "departureAirport",
    type: "text",
    label: "Departure Airport"
  },
  {
    key: "arrivalAirport",
    type: "text",
    label: "Arrival Airport"
  },
  {
    key: "mileage",
    type: "text",
    label: "Mileage/Km"
  }
  ,
  {
    key: "duration",
    type: "text",
    label: "Duration/Hours"
  }
  ,
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  },
  {
    key: "isDelete",
    type: "isDelete",
    label: ""
  }
]


@Component({
  selector: 'app-route-screen',
  templateUrl: './route-screen.component.html',
  styleUrls: ['./route-screen.component.scss']
})
export class RouteScreenComponent implements OnInit {
  constructor(public dialog: MatDialog) {
  }

  columnsSchema: any = columnSchema;
  dataSet: any = userData
  temporaryDataSet: any = userData;

  arrivalControl = new FormControl('');
  departureControl = new FormControl('');
  filteredArrivalAirport: Observable<string[]> | undefined;
  filteredDepartureAirport: Observable<string[]> | undefined;
  private arrivalAirportArray: string[] | undefined;
  private departureAirportArray: string[] | undefined;
  errorMessage: string | undefined;

  ngOnInit() {
    this.arrivalAirportArray = Array.from(
      new Set(userData.map((col) => col.arrivalAirport))
    );
    this.departureAirportArray = Array.from(
      new Set(userData.map((col) => col.departureAirport))
    );

    this.filteredArrivalAirport = this.arrivalControl.valueChanges.pipe(startWith(''),
      map(value => this._filter(value || '', this.arrivalAirportArray)),
    );
    this.filteredDepartureAirport = this.departureControl.valueChanges.pipe(startWith(''),
      map(value => this._filter(value || '', this.departureAirportArray)),
    );
  }

  private _filter(value: string, ArrayData: any): string[] {
    const filterValue = value.toLowerCase();
    return ArrayData.filter((option: any) => option.toLowerCase().includes(filterValue));
  }

  openForm(): void {
    let dialogRef = this.dialog.open(AddRouteFormComponent, {
      height: '400px',
      disableClose: true,
      width: '600px',
      data: {
        ds: this.dataSet,
        id: '',
        rowData: '',
      },

    });
  }

  removeRow(id: number) {
    //find the index that need to be deleted
    const index = this.dataSet.findIndex((value: any) => value.id === id);
    this.dataSet.splice(index, 1);

  }

  search() {
    if (this.dataSet.find((obj: any) => (obj.departureAirport === this.departureControl.value) ||
      (obj.arrivalAirport === this.arrivalControl.value))) {
      this.temporaryDataSet = this.dataSet;
      const filterAirportData = this.dataSet.filter((obj: any) => {
        return obj.departureAirport === this.departureControl.value || obj.arrivalAirport === this.arrivalControl.value;
      });
      this.dataSet = filterAirportData
    } else {
      this.errorMessage = "The Searching route not available in the system!!!"
    }
  }

  clearSearch() {
    this.dataSet = this.temporaryDataSet;
  }

  editData(id: number) {
    let dialogRef = this.dialog.open(AddRouteFormComponent, {
      height: '400px',
      disableClose: true,
      width: '600px',
      data: {
        ds: this.dataSet,
        id: id,
        rowData: this.dataSet[id - 1],
      },

    });

  }

}
