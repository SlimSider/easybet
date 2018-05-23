import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

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
  error: string;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit() {
  }

  login() {
    let user = new User(this.loginForm.get('username').value, "", this.loginForm.get('password').value);
    this.userService.login(user,
      res => {
      console.log(res.body);
      this.error = null;
        this.authService.setCurrentUsername(res.body.username);
        this.authService.setCurrentUserRole(res.body.role);
        this.authService.setCurrentUserBalance(res.body.balance);
        this.router.navigate(['home'] );
        console.log( this.authService.getCurrentUsername());
        console.log( this.authService.getCurrentUserRole());
        console.log( this.authService.getCurrentUserBalance());
      },
      err => {
        console.log(err);
        this.error = err.error;
      }
    );
  }

}
