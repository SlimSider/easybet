import {Component, OnInit} from '@angular/core';
import {MatchService} from "../service/match.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {EventDialogComponent} from "../event-dialog/event-dialog.component";
import {FootballMatch} from "../model/match/football-match";
import {BaseballMatch} from "../model/match/baseball-match";
import {RugbyMatch} from "../model/match/rugby-match";
import {HockeyMatch} from "../model/match/hockey-match";
import {BasketballMatch} from "../model/match/basketball-match";

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.css']
})
export class NewMatchComponent implements OnInit {
  newMatchForm: FormGroup = new FormGroup({
    home: new FormControl('', [Validators.required]),
    away: new FormControl('', [Validators.required]),
    competition: new FormControl('', [Validators.required]),
    sport: new FormControl('', [Validators.required])
  });
  date: string;
  minDate = new Date();
  error : string;

  constructor(private matchService: MatchService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  addMatch(match) {
    this.error = null;
    console.log(match);
    match.events = Array.from(match.events);
    this.matchService.addMatch(match, res=>{this.newMatchForm.reset(); this.newMatchForm.markAsUntouched(); this.date = null}, err => this.error = err.error);
  }

  setDate(date) {
    const d: Date = date.value;
    this.date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  }

  openDialog() {
    let match;
    const sport = this.newMatchForm.get('sport').value;
    if(sport == 'Football') {
      match = new FootballMatch(this.newMatchForm.get('home').value, this.newMatchForm.get('away').value, this.newMatchForm.get('competition').value, this.newMatchForm.get('sport').value, this.date, true);
    } else if(sport == 'Basketball') {
      match = new BasketballMatch(this.newMatchForm.get('home').value, this.newMatchForm.get('away').value, this.newMatchForm.get('competition').value, this.newMatchForm.get('sport').value, this.date, true);
    } else if(sport == 'Hockey') {
      match = new HockeyMatch(this.newMatchForm.get('home').value, this.newMatchForm.get('away').value, this.newMatchForm.get('competition').value, this.newMatchForm.get('sport').value, this.date, true);
    } else if(sport == 'Baseball') {
      match = new BaseballMatch(this.newMatchForm.get('home').value, this.newMatchForm.get('away').value, this.newMatchForm.get('competition').value, this.newMatchForm.get('sport').value, this.date, true);
    } else if(sport == 'Rugby') {
      match = new RugbyMatch(this.newMatchForm.get('home').value, this.newMatchForm.get('away').value, this.newMatchForm.get('competition').value, this.newMatchForm.get('sport').value, this.date, true);
    }
    let dialogRef = this.dialog.open(EventDialogComponent, {
      width: '550px',
      data: { match : match }
    });

    dialogRef.afterClosed().subscribe(result => {if(result) {this.addMatch(match);}})
  }
}
