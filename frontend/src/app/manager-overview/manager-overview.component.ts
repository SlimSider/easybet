import {AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';
import {User} from "../model/user";
import {Charts} from "../chart/charts";
import {UserService} from "../service/user.service";
import {MatchService} from "../service/match.service";
import {Type} from "../model/enums/type";

@Component({
  selector: 'app-manager-overview',
  templateUrl: './manager-overview.component.html',
  styleUrls: ['./manager-overview.component.css'],
  inputs: ['user']
})

export class ManagerOverviewComponent implements AfterViewInit {
  @Input()
  private user: User;
  private matchChart: any;
  private eventChart: any;
  private matchData = [];
  private eventData = [];
  private empty : boolean = false;

  constructor(private cdRef: ChangeDetectorRef, private userService: UserService, private matchService: MatchService) { }

  ngAfterViewInit() {
    let football = 0, basketball = 0, baseball = 0, rugby = 0, hockey = 0;
    let u_o = 0, ft = 0, ht = 0;
    this.matchService.getMatches(res => {
      res.body.forEach((match) => {
        console.log(match);
        if (match.sport == 'Football') {
          football++;
        } else if (match.sport == 'Basketball') {
          basketball++;
        } else if (match.sport == 'Baseball') {
          baseball++;
        } else if (match.sport == 'Rugby') {
          rugby++;
        } else {
          hockey++;
        }
        match.events.forEach((event) => {
          if (event.type == Type.FINAL_TIME) {
            ft++;
          } else if (event.type == Type.HALF_TIME) {
            ht++;
          } else {
            u_o++;
          }
        });
      });
        this.matchData = [football, basketball, baseball, rugby, hockey];
        this.eventData = [u_o, ft, ht];
        this.matchChart = Charts.getChart((<HTMLCanvasElement>document.getElementById('matchChart')).getContext('2d'),
          'doughnut', [['Football'],['Basketball'],['Baseball'],['Rugby'],['Hockey']], this.matchData,
          ['rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(255, 3, 164, 0.8)', 'rgba(120, 65, 200, 0.8)'], "Match chart");
        this.eventChart = Charts.getChart((<HTMLCanvasElement>document.getElementById('eventChart')).getContext('2d'),
          'doughnut', [['Under/Over'],['Final time'],['Half time']], this.eventData,
          ['rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'], "Event chart");
      });
    this.cdRef.detectChanges();
  }
}
