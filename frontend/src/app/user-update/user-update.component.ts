import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  @Input()
  private user: User;
  userForm: FormGroup;

  constructor(private userSercive: UserService, private auth: AuthService) { }

  ngOnInit() {
    console.log(this.user);
    this.userForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('', [Validators.maxLength(50)]),
      email: new FormControl('', [Validators.email]),
    });
  }

  done() : void {
    if(this.userForm.get('username').value) {
      this.user.setUsername(this.userForm.get('username').value);
    }
    if(this.userForm.get('password').value) {
      this.user.setPassword(this.userForm.get('password').value);
    }
    if(this.userForm.get('email').value) {
      this.user.setEmail(this.userForm.get('email').value);
    }
    console.log(this.user);
    this.userSercive.update(this.user, res => {console.log(res); this.auth.setCurrentUsername(res.body.username); });
  }


}
