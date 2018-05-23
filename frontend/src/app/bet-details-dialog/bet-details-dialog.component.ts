import {Component, Inject, OnInit} from '@angular/core';
import {EventDialogComponent} from "../event-dialog/event-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-bet-details-dialog',
  templateUrl: './bet-details-dialog.component.html',
  styleUrls: ['./bet-details-dialog.component.css']
})
export class BetDetailsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EventDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
