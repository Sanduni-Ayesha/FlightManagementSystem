import {Component, OnInit} from '@angular/core';
import {FormControl, ɵElement, ɵValue} from "@angular/forms";

import {MatDialog} from "@angular/material/dialog";
import {AddRouteFormComponent} from "../add-route-form/add-route-form.component";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

const USER_DATA = [
  {id:1,departureAirport: "Colombo", arrivalAirport: "Dubai", mileage: "36",duration:"20"},
  {id:2,departureAirport: "Katunayaka", arrivalAirport: "Dubai", mileage: "28",duration:"20"}
];
const COLUMNS_SCHEMA = [
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
    key:"isDelete",
    type: "isDelete",
    label:""
  }
]



@Component({
  selector: 'app-create-route-table',
  templateUrl: './create-route-table.component.html',
  styleUrls: ['./create-route-table.component.scss']
})
export class CreateRouteTableComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any =  new MatTableDataSource(USER_DATA);
  columnsSchema: any = COLUMNS_SCHEMA;
  ArrivalControl = new FormControl('');
  DepartureControl = new FormControl('');
  ArrivalFilteredOptions: Observable<string[]> | undefined;
  DepartureFilteredOptions: Observable<string[]> | undefined;
  //Getting  all arrival airports to the array
  private ArrivalAirport: string[] | undefined;
  private DepartureAirport: string[] | undefined;
  Error_message:string |undefined;
  ngOnInit() {
    this.ArrivalAirport= Array.from(
      new Set(USER_DATA.map((col) => col.arrivalAirport))
    );
    this.DepartureAirport = Array.from(
    new Set(USER_DATA.map((col) => col.departureAirport))
  );

    this.ArrivalFilteredOptions = this.ArrivalControl.valueChanges.pipe(startWith(''),
      map(value => this._filter(value || '',this.ArrivalAirport)),
    );
    this.DepartureFilteredOptions = this.DepartureControl.valueChanges.pipe(startWith(''),
      map(value => this._filter(value || '',this.DepartureAirport)),
    );


  }



  private _filter(value: string,ArrayData:any): string[] {
    const filterValue = value.toLowerCase();
    return ArrayData.filter((option:any) => option.toLowerCase().includes(filterValue));
  }
 openForm() :void{
   let dialogRef = this.dialog.open(AddRouteFormComponent, {
     height: '400px',
     disableClose:true,
     width: '600px',
     data: {
       ds: this.dataSource,
     },

   });
 }

  removeRow(id:number){
    //find the index that need to be deleted
    const index = this.dataSource.filteredData.findIndex((value :any) => value.id === id);
    this.dataSource.filteredData.splice(index, 1);
    this.dataSource._updateChangeSubscription()
  }

  search(){
    if (this.dataSource.filteredData.find((obj:any) => (obj.departureAirport === this.DepartureControl.value) || (obj.arrivalAirport === this.ArrivalControl.value))){
    this.dataSource.filter = this.DepartureControl.value
    this.dataSource.filter = this.ArrivalControl.value}
    else{
      this.Error_message = "The Searching route not available in the system!!!"
    }
  }

}
