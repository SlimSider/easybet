import {Component, Input, OnInit} from '@angular/core';
import {MatchService} from "../service/match.service";
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {MatDialog, MatSnackBar} from '@angular/material';
import {TicketDialogComponent} from "../ticket-dialog/ticket-dialog.component";
import {User} from "../model/user";
import {MatchUpdateDialogComponent} from "../match-update-dialog/match-update-dialog.component";
import {Match} from "../model/match/match";
import {Event} from "../model/event";
import {EventDialogComponent} from "../event-dialog/event-dialog.component";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  @Input()
    betting: boolean = true;
  dataSource: Array<Match> = [];
  events = new Set<Event>();
  choices = [];
  eventProps = new Map<Event, {odds : number, choice : string}>();
  user: User;
  odds: number;
  error;

  constructor(private matchService: MatchService, private authService: AuthService, public snackBar: MatSnackBar,  public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {}

  show() {
    this.userService.getUserByUsername(this.authService.getCurrentUsername(), res => {this.user = Object.assign(new User(), res.body); this.update();});
  }

  update() {
    this.error = false;
    this.dataSource = [];
    this.matchService.getMatches(
      data => {
        if(data.body.length == 0) {this.error = true}
        data.body.forEach((data) => {if(data.active) {this.dataSource.push(data);}
        })
      }
    );
  }

  clearEvent(event: Event) {
    this.eventProps.delete(event);
    this.snackBar.open('Event removed', 'Ok', {duration: 2000});
    console.log(this.eventProps.has(event));
  }

  addEvent(event : Event, odds : number, choice : string) {
    this.eventProps.set(event, {odds: odds, choice: choice});
    this.snackBar.open('Event added', 'Ok', {duration: 2000});
  }

  addEventToMatch(match) {
    console.log(match);
    let dialogRef = this.dialog.open(EventDialogComponent, {
      width: '550px',
      data : {match : match}
    });
    dialogRef.afterClosed().subscribe(match =>
      {if(match)this.matchService.updateMatch(match, res =>
        {console.log(res); this.snackBar.open('Event added', 'Ok', {duration: 2000}); this.update();}
        )
      }
    );
  }

  openDialog() {
    let newOdds = 1;
    let newChoices = [];
    this.eventProps.forEach((value, key) => {newOdds *= value.odds; this.events.add(key); newChoices.push(value.choice)});
    this.odds = newOdds;
    this.choices = newChoices;
    let dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '550px',
      data: { events : this.events, odds: this.odds, choices : this.choices, balance: this.user.getBalance() }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.user.getBets().push(result);
        this.user.setBalance(this.user.getBalance() - result.stake);
        this.userService.update(this.user, res => {
          this.user = Object.assign(new User(), res.body);
          this.authService.setCurrentUserBalance(res.body.balance);
          this.snackBar.open('Bet was placed', 'Ok', {duration: 2000});
          this.reset();
        });
      }
    })
  }

  reset() {
    this.events.clear();
    this.eventProps.clear();
    this.choices = [];
    this.odds = 1;
  }

  endMatch(match) {
    let dialogRef = this.dialog.open(MatchUpdateDialogComponent, {
      width: '550px',
      data: { match : match }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.matchService.updateMatch(match, res => {
        this.update();
        console.log(res)
      })
    })
  }

  deleteEvent(match, event) {
    console.log(match.events)
    const index = match.events.indexOf(event);
    match.events.splice(index, 1);
    this.matchService.updateMatch(match, res=>{console.log(res); this.update(); this.snackBar.open('Event has been removed', 'Ok', {duration: 2000});});
  }

  deleteMatch(match) {
    this.matchService.deleteMatch(match.id, res=>{console.log(res); this.update(); this.snackBar.open('Match has been removed', 'Ok', {duration: 2000});});
  }

}
