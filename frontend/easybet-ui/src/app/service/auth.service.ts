import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../model/user";
import {Http} from "@angular/http";
import {ApiService} from "./api.service";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  constructor(private api : ApiService, private tokenService: TokenService, private router: Router) {}

  private urlToUse = 'http://localhost:8080/';

  attemptRegister(user: User) : Observable<any> {
    return this.api.postRequest(this.urlToUse+'register', user);
  }

  attemptLogin(user: User) : Observable<any> {
    return this.api.postRequest(this.urlToUse+'login', user);
  }

  logout() {
    this.tokenService.logout();
    this.router.navigate(['home']);
  }

  setCurrentUser(user: User) {
    console.log(user);
    window.sessionStorage.setItem("currentUser", user.getUsername());
  }

  getCurrentUser() {
    return window.sessionStorage.getItem("currentUser");
  }

}
