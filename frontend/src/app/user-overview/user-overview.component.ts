import {AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';
import {User} from "../model/user";
import {Bet} from "../model/bet";
import {Charts} from "../chart/charts";

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements AfterViewInit {
  @Input()
  private user: User;
  private betChart: any;
  private moneyChart: any;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
      let won = 0, lost = 0, pending = 0;
      let profit = 0, loss = 0, active = 0;
      this.user.getBets().forEach((bet) => {
        bet = Object.assign(new Bet(), bet);
        if (bet.isActive()) {
          pending++;
          active += bet.geStake();
        }
        else if (bet.getWon()) {
          won++;
          profit += bet.geStake() * bet.getOdds();
        }
        else {
          lost++;
          loss += bet.geStake();
        }
      });
      this.betChart = Charts.getChart((<HTMLCanvasElement>document.getElementById('betChart')).getContext('2d'),
        'doughnut', [['Pending'],['Lost'],['Won']], [pending, lost, won],
        ['rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'], "Bet's chart");
      this.moneyChart = Charts.getChart((<HTMLCanvasElement>document.getElementById('moneyChart')).getContext('2d'),
        'doughnut', [["Pending"], ["Lost"], ["Won"]], [active, loss, profit],
          ['rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'], 'Money chart');
      this.cdRef.detectChanges();
    }

}
