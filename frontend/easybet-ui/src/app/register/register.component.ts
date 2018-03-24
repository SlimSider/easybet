import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {User} from "../model/user";
import {TokenService} from "../service/token.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private authService: AuthService, private router: Router, private token: TokenService) { }

  ngOnInit() {
  }

  register() {
    let user = new User(this.registerForm.get('username').value, this.registerForm.get('email').value, this.registerForm.get('password').value, 0, "USER");
    this.authService.attemptRegister(user)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['login'] );
        });
  }

}
