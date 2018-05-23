import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/user";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})

export class AdminProfileComponent implements OnInit {
  @Input()
  user: User;

  constructor() {}

  ngOnInit() {

  }
}
