import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css'],
  inputs : ['user']
})
export class ManagerProfileComponent implements OnInit {
  private user: User;

  constructor() { }

  ngOnInit() {
  }

}
