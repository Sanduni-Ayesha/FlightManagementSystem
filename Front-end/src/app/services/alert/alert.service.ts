import { Injectable } from '@angular/core';
import {AlertModalComponent} from "../../component/Alert/alert-modal/alert-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog,private snackBar: MatSnackBar) { }
  config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  }

  openConfirmDialog(title: string, message:string){
    return this.dialog.open(AlertModalComponent,{
      width: '390px',
      disableClose: true,
      data :{
        title: title,
        message : message
      }
    });
  }

  success(message: string) {
    this.config['panelClass'] = ['success'];
    this.snackBar.open(message, 'Success',this.config);
  }

  warn(message: string) {
    this.config['panelClass'] = ['warn'];
    this.snackBar.open(message, 'WARNING', this.config);
  }
}
