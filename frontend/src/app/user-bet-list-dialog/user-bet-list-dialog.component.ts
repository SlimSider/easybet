import {Component, Inject, OnInit} from '@angular/core';
import {EventDialogComponent} from "../event-dialog/event-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {User} from "../model/user";
import {Bet} from "../model/bet";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-user-bet-list-dialog',
  templateUrl: './user-bet-list-dialog.component.html',
  styleUrls: ['./user-bet-list-dialog.component.css']
})
export class UserBetListDialogComponent implements OnInit {
  user: User;
  displayedColumns = ['stake', 'odds', 'won', 'in progress', 'return'];
  dataSource = new MatTableDataSource<Bet>();

  constructor(public dialogRef: MatDialogRef<EventDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) { }

  ngOnInit() {
    this.user = Object.assign(new User(), this.data.user);
    this.update();
  }

  update() {
    this.dataSource.data = this.user.getBets();
  }

  close() {
    this.dialogRef.close();
  }

  deleteBet(bet) {
    const index = this.user.getBets().indexOf(bet);
    this.user.getBets().splice(index, 1);
    this.user.setBalance(this.user.getBalance() + bet.stake);
    this.userService.update(this.user, res => {console.log(); this.update();})
  }

}
