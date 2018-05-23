import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-match-management',
  templateUrl: './match-management.component.html',
  styleUrls: ['./match-management.component.css']
})
export class MatchManagementComponent implements OnInit {
  option: string = null;
  constructor() { }

  ngOnInit() {
  }

  setOption(value : string) {
    this.option = value;
  }

}
