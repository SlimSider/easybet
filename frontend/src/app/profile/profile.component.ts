import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.userService.getUserByUsername(params.username, res => this.user = Object.assign(new User(), res.body)));
  }

}
