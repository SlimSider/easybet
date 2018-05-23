import {Component, OnInit} from '@angular/core';
import {Match} from "../model/match/match";
import {HockeyMatch} from "../model/match/hockey-match";
import {BaseballMatch} from "../model/match/baseball-match";
import {Router} from "@angular/router";
import {MatchService} from "../service/match.service";
import {MatDialog, MatTableDataSource} from '@angular/material';
import {RugbyMatch} from "../model/match/rugby-match";
import {BasketballMatch} from "../model/match/basketball-match";
import {FootballMatch} from "../model/match/football-match";
import {EventDialogComponent} from "../event-dialog/event-dialog.component";

@Component({
  selector: 'app-new-match-remote',
  templateUrl: './new-match-remote.component.html',
  styleUrls: ['./new-match-remote.component.css']
})
export class NewMatchRemoteComponent implements OnInit {
  private displayedColumns = ['home', 'away', 'competition', 'events'];
  private dataSource = new MatTableDataSource<any>();
  private match : Match;
  private sport: string;
  private date: string;
  private minDate = new Date();
  private error;

  constructor(private router: Router, private matchService: MatchService, public dialog: MatDialog) {}

  ngOnInit() {
  }

  requestMatches() {
    this.error=null;
    this.matchService.getSelectableMatches(
      data => {
        this.dataSource.data = data.body;
        this.filter();
      },
      err => {
        this.error = err.error;
        this.dataSource.data = [];
      },
      {date: this.date, sport: this.sport}
    );
  }

  filter() {
    this.matchService.getMatches(res => {
      if(res.body && this.dataSource.data) {
        res.body.forEach((match) => {
          this.dataSource.data = this.dataSource.data.filter((newMatch) => {
              console.log(match.home == newMatch.home);
              return match.home != newMatch.home || match.away != newMatch.away || match.date != newMatch.date;
            }
          );
        });
      }
    });
  }

  addMatch() {
    this.matchService.addMatch(this.match,
      () => {this.match = null; this.filter();});
  }

  setDate(date) {
    const d: Date = date.value;
    this.date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  }

  openDialog(match) {
    console.log(match);
    const sport = match.sport;
    let temp;
    if(sport == 'Football') {
      temp = new FootballMatch(match.home, match.away, match.competition, sport, match.date, true);
    } else if(sport == 'Basketball') {
      temp = new BasketballMatch(match.home, match.away, match.competition, sport, match.date, true);
    } else if(sport == 'Hockey') {
      temp = new HockeyMatch(match.home, match.away, match.competition, sport, match.date, true);
    } else if(sport == 'Baseball') {
      temp = new BaseballMatch(match.home, match.away, match.competition, sport, match.date, true);
    } else if(sport == 'Rugby') {
      temp = new RugbyMatch(match.home, match.away, match.competition, sport, match.date, true);
    }
    let dialogRef = this.dialog.open(EventDialogComponent, {
      width: '550px',
      data: { match :  temp }
    });
    dialogRef.afterClosed().subscribe(result => { if(result) {
      result.events = Array.from(result.events);
      this.match = result; console.log(result); console.log(this.match);
      this.addMatch();
    }
    })
  }

}
