import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../service/auth.service";
import {User} from "../model/user";
import {TokenService} from "../service/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient, private authService: AuthService, private token: TokenService, private router: Router) {}

  ngOnInit() {
  }

  login() {
    let user = new User(this.loginForm.get('username').value, "", this.loginForm.get('password').value);
    this.authService.attemptLogin(user).subscribe(
      res => {
        console.log(res);
        console.log(res.headers.get('authorization'));
        this.token.saveToken(res.headers.get('authorization'));
        this.authService.setCurrentUser(user);
        this.router.navigate(['home'] );
      }
    );
  }

}
