import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  inputs: ['user']
})
export class UserProfileComponent implements OnInit {
  private user: User;

  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }
}
