import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css']
})
export class MatchCardComponent implements OnInit {
  @Input()
  type: string;
  @Input()
  count: number;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  navigate() {
    this.router.navigate(['match-list']);
  }

}
