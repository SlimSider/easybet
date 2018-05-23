import { Component, OnInit } from '@angular/core';
import {MatchService} from "../service/match.service";
import {AuthService} from "../service/auth.service";
import {MatTableDataSource} from "@angular/material";
import {Match} from "../model/match/match";

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {
  displayedColumns = ["home", "away", "comp", "home_score", "away_score"];
  dataSource = new MatTableDataSource<Match>();
  error;

  constructor(private matchService: MatchService, private auth: AuthService) { }

  ngOnInit() {
  }

  show() {
    this.error = false;
    this.matchService.getMatches( res => {
      if(res.body.length == 0) {this.error = true}
      res.body.forEach( match => {
        if(!match.active) {this.dataSource.data.push(match)}
      });
    });
  }

}
