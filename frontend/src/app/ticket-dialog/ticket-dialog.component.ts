import {Component, Inject, OnInit} from '@angular/core';
import {EventDialogComponent} from "../event-dialog/event-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Event} from "../model/event";
import {Bet} from "../model/bet";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})
export class TicketDialogComponent implements OnInit {
  form: FormGroup;
  events : Set<Event>;
  odds : number;
  choices : Array<string>;
  balance : number;

  constructor(public dialogRef: MatDialogRef<EventDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.balance = this.data.balance;
    this.events = this.data.events;
    this.odds = this.data.odds;
    this.choices = this.data.choices;
    this.form = new FormGroup({
      stake: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*'), Validators.max(this.balance)]),
    });
  }

  done() : void {
    console.log(this.events);
    const bet = new Bet(this.form.get('stake').value, this.odds, false, true, Array.from(this.events), this.choices);
    this.dialogRef.close(bet);
    console.log(bet);
  }
}
