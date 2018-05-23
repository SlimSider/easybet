import {AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';
import {User} from "../model/user";
import {Charts} from "../chart/charts";
import {UserService} from "../service/user.service";
import {MatchService} from "../service/match.service";
import {Type} from "../model/enums/type";
import {Role} from "../model/enums/role";

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css']
})
export class AdminOverviewComponent implements AfterViewInit {
  @Input()
  private user: User;
  private matchChart: any;
  private eventChart: any;
  private userChart: any;
  private matchData = [];
  private eventData = [];
  private userData = [];
  private empty = false;

  constructor(private cdRef: ChangeDetectorRef, private userService: UserService, private matchService: MatchService) { }

  ngAfterViewInit() {
    let userCount = 0, managerCount = 0, adminCount = 0;
    let football = 0, basketball = 0, baseball = 0, rugby = 0, hockey = 0;
    let u_o = 0, ft = 0, ht = 0;
    this.userService.getUsers(res => {
      res.body.forEach((user) => {
        user = Object.assign(new User(), user);
        if (user.getRole() == Role.PLAYER) {
          userCount++;
        }
        else if (user.getRole() == Role.MANAGER) {
          managerCount++;
        }
        else {
          adminCount++;
        }
      });
      this.matchService.getMatches(res => {
        if(res.body.length == 0) {this.empty = true}
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
        this.userData = [userCount, managerCount, adminCount];
        this.matchData = [football, basketball, baseball, rugby, hockey];
        this.eventData = [u_o, ft, ht];
        this.userChart = Charts.getChart((<HTMLCanvasElement>document.getElementById('userChart')).getContext('2d'),
          'doughnut', [['User'],['Manager'],['Admin']], this.userData,
          ['rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'], "User chart");
        this.matchChart = Charts.getChart((<HTMLCanvasElement>document.getElementById('matchChart')).getContext('2d'),
          'doughnut', [['Football'],['Basketball'],['Baseball'],['Rugby'],['Hockey']], this.matchData,
          ['rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(255, 3, 164, 0.8)', 'rgba(120, 65, 200, 0.8)'], "Match chart");
        this.eventChart = Charts.getChart((<HTMLCanvasElement>document.getElementById('eventChart')).getContext('2d'),
          'doughnut', [['Under/Over'],['Final time'],['Half time']], this.eventData,
          ['rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'], "Event chart");
      });
    });
    this.cdRef.detectChanges();
  }
}
