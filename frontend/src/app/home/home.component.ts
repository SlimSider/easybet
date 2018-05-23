import {Component, OnInit} from '@angular/core';
import {MatchService} from "../service/match.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  matchesInfo = [];
  loggedIn: boolean;

  constructor(private matchService: MatchService, private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn = !!this.authService.getCurrentUsername();
    const infoMap = new Map().set('Football', 0).set('Basketball', 0).set('Baseball', 0).set('Rugby', 0).set('Hockey', 0);
    if(this.loggedIn) {
      this.matchService.getMatches(
        res => {
          res.body.forEach(match => {
            if(match.active) {
              if(match.sport == 'Football') {
                infoMap.set('Football', infoMap.get('Football')+1);
              } else if(match.sport == 'Basketball') {
                infoMap.set('Basketball', infoMap.get('Basketball')+1);
              } else if(match.sport == 'Baseball') {
                infoMap.set('Baseball', infoMap.get('Baseball')+1);
              } else if(match.sport == 'Hockey') {
                infoMap.set('Hockey', infoMap.get('Hockey')+1);
              } else {
                infoMap.set('Rugby', infoMap.get('Rugby')+1);
              }
            }
          });
          infoMap.forEach((v,k) => this.matchesInfo.push({type: k, count : v}));
        }
      )
    }
  }

}
