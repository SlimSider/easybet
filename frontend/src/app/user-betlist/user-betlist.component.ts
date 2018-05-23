import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {MatTableDataSource} from "@angular/material";
import {Bet} from "../model/bet";
import {MatchService} from "../service/match.service";

@Component({
  selector: 'app-user-betlist',
  templateUrl: './user-betlist.component.html',
  styleUrls: ['./user-betlist.component.css'],
  inputs: ['user']
})
export class UserBetlistComponent implements OnInit {
  private user: User;
  displayedColumns = ['stake', 'odds', 'won', 'in progress', 'return'];
  dataSource = new MatTableDataSource<Bet>();

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.dataSource.data = this.user.getBets();
  }

}
