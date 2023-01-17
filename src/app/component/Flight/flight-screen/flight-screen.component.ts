import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { AddFlightFormComponent } from '../add-flight-form/add-flight-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

const DATA = [
  {
    id: 1,
    Departure_Airport: 'Sydney',
    Arrival_Airport: 'Katunayake',
    FlightNo: 'AB2001',
    Departure_Time: '2023-01-20T12:12',
    Arrival_Time: '2023-01-23T12:12',
  },
  {
    id: 2,
    Departure_Airport: 'Singapore',
    Arrival_Airport: 'Tokyo',
    FlightNo: 'A001',
    Departure_Time: '10-01-2023 08.00.00',
    Arrival_Time: '10-01-2023 08.00.00',
  },
  {
    id: 3,
    Departure_Airport: 'Delhi',
    Arrival_Airport: 'Dubai',
    FlightNo: 'A001',
    Departure_Time: '10-01-2023 08.00.00',
    Arrival_Time: '10-01-2023 08.00.00',
  },
  {
    id: 4,
    Departure_Airport: 'Sydney',
    Arrival_Airport: 'Mumbai',
    FlightNo: 'A001',
    Departure_Time: '10-01-2023 08.00.00',
    Arrival_Time: '10-01-2023 08.00.00',
  },
];

const COLUMNS = [
  {
    key: 'Departure_Airport',
    type: 'text',
    label: 'Departure_Airport',
  },
  {
    key: 'Arrival_Airport',
    type: 'text',
    label: 'Arrival Airport',
  },
  {
    key: 'FlightNo',
    type: 'text',
    label: 'FlightNo',
  },
  {
    key: 'Departure_Time',
    type: 'datetime-local',
    label: 'Departure_Time',
  },
  {
    key: 'Arrival_Time',
    type: 'datetime-local',
    label: 'Arrival_Time',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
  {
    key: 'isDelete',
    type: 'isDelete',
    label: '',
  },
];
@Component({
  selector: 'app-flight-screen',
  templateUrl: './flight-screen.component.html',
  styleUrls: ['./flight-screen.component.scss'],
})
export class FlightScreenComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  // for table structure
  displayedColumns: string[] = COLUMNS.map((col) => col.key);
  //dataSource: any = new MatTableDataSource(DATA);
  dataSource: any = DATA;
  columnsSchema: any = COLUMNS;

  // for dropdowns in search
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  departures: string[] = Array.from(
    new Set(DATA.map((col) => col.Departure_Airport))
  );
  arrivals: string[] = Array.from(
    new Set(DATA.map((col) => col.Arrival_Airport))
  );

  //functions for search option
  filteredDepartures: Observable<string[]> | undefined;
  filteredArrivals: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredDepartures = this.myControl1.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterDeparture(value || ''))
    );
    this.filteredArrivals = this.myControl2.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterArrivals(value || ''))
    );
  }

  private filterDeparture(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.departures.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  private filterArrivals(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.arrivals.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  filter(departure: string, arrive: string) {
    if (departure != '' && arrive != '') {
      /*const dep = this.dataSource.data.filter(
          (u: any) => u.Departure_Airport == departure
        );
        const arr = this.dataSource.data.filter(
          (u: any) => u.Arrival_Airport == arrive
        );
        console.log(dep);
        if (dep.length == 0) {
          console.log('Departure not available');
          return;
        } else {*/
      //console.log(this.dataSource.data[0].Departure_Airport);
      this.dataSource = this.dataSource.filter(
        (u: any) => u.Departure_Airport == departure
      );
      this.dataSource = this.dataSource.filter(
        (u: any) => u.Arrival_Airport == arrive
      );
    } else {
      this.dataSource = DATA;
    }

    //this.dataSource = this.dataSource.filter = arrive;
    /*}*/

    //const arr = this.dataSource.data.map(({'Departure_Airport'}) => ('Departure_Airport'));
    //console.log(this.dataSource.filteredData.length == 0);
  }

  removeRow(id: number) {
    this.dataSource = this.dataSource.filter((u: any) => u.id != id);
  }

  editRow(id: number) {
    const formModal = this.dialog.open(AddFlightFormComponent, {
      width: '640px',
      disableClose: true,
      data: {
        id: id - 1,
        ds: this.dataSource,
        row: this.dataSource[id - 1],
      },
    });
  }

  openForm(): void {
    //this.dataSource.data = new MatTableDataSource(DATA);
    const formModal = this.dialog.open(AddFlightFormComponent, {
      width: '640px',
      disableClose: true,
      data: {
        id: '',
        ds: this.dataSource,
        row: '',
      },
    });
  }
}
