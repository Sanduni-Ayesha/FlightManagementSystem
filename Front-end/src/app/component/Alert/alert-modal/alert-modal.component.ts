import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
    private title: string = "";
    private message: string = "";

    constructor(
        public dialog: MatDialog,
        @Inject(DIALOG_DATA) public data: any,
    ) {
    }

    ngOnInit() {
        this.title = this.data.title;
        this.message = this.data.message;
    }
}
