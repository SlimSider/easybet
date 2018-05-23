import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  constructor(private api : ApiService, private tokenService: TokenService, private router: Router) {}

  logout() {
    this.tokenService.logout();
    this.router.navigate(['home']);
  }

  private storeUsername(username: string) : void {
    window.sessionStorage.setItem("username", username);
  }

  private retrieveUsername() {
    return window.sessionStorage.getItem("username");
  }

  private storeUserRole(role: string) : void {
    window.sessionStorage.setItem("role", role);
  }

  private retrieveUserRole() {
    return window.sessionStorage.getItem("role");
  }

  private storeUserBalance(balance: number) : void {
    window.sessionStorage.setItem("balance", String(balance));
  }

  private retrieveUserBalance() {
    return +window.sessionStorage.getItem("balance");
  }

  getCurrentUsername() {
    return this.retrieveUsername();
  }

  setCurrentUsername(value: string) {
    console.log(value);
    this.storeUsername(value);
    console.log(this.getCurrentUsername());
  }

  getCurrentUserBalance() {
    return this.retrieveUserBalance();
  }

  setCurrentUserBalance(value: number) {
    console.log(value);
    this.storeUserBalance(value);
  }

  getCurrentUserRole() {
    return this.retrieveUserRole();
  }

  setCurrentUserRole(value: string) {
    console.log(value);
    this.storeUserRole(value);
    console.log(this.getCurrentUserRole());
  }

}
