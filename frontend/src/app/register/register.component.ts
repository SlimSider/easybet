import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../model/user";
import {Role} from "../model/enums/role";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  error: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    let user = new User(this.registerForm.get('username').value, this.registerForm.get('email').value, this.registerForm.get('password').value, 5000, Role.PLAYER);
    this.userService.add(user,
        res => {
          console.log(res);
          this.router.navigate(['login'] );
        },
      err => {
        console.log(err);
        this.error = err.error;
      });
  }

}
