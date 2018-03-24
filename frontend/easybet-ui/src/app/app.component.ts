import { Component } from '@angular/core';
import {TokenService} from "./service/token.service";
import {AuthService} from "./service/auth.service";
import {HttpHeaders} from "@angular/common/http";
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private title = 'app';
  private user: string;
  private common = [
    {link: '/users', title: 'User List'},
    {link: '/profile/', title: 'User profile'}
  ];

  constructor(private tokenService: TokenService, private authService: AuthService, private userService: UserService) {
    console.log(this.tokenService.getToken());
  }

  logout() {
    this.authService.logout();
  }
}
