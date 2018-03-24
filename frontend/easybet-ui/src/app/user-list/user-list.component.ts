import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material";
import {UserService} from "../service/user.service";
import {TokenService} from "../service/token.service";
import {User} from "../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserComponent implements OnInit {
  newUserForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    balance: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  displayedColumns = ['id', 'username', 'email', 'balance', 'edit'];
  dataSource = new MatTableDataSource();
  openPanelState: boolean = false;

  constructor(private router: Router, private userService: UserService, private tokenService: TokenService) {
  }

  ngOnInit() {
    this.update();
  }

  update() {
    this.userService.getUsers().subscribe(
      data => {
        this.tokenService.saveToken(data.headers.get('authorization'))
        this.dataSource.data = data.body;
      },
      err => {
        console.log(err);
      }
    )
  }

  delete(id: number) {
    this.userService.delete(id).subscribe(
      res => {
        this.tokenService.saveToken(res.headers.get('authorization'))
        console.log(res)
        this.update();
      },
      err => {
        console.log(err);
      });
  }

  create(user: User) {
    this.userService.add(user).subscribe(
      res => {
        this.tokenService.saveToken(res.headers.get('authorization'))
        console.log(res)
        this.update();
      },
      err => {
        console.log(err);
      });
  }

  addAction() {
    const user = new User(this.newUserForm.get('username').value, this.newUserForm.get('email').value,
                          this.newUserForm.get('password').value, this.newUserForm.get('balance').value,
                          this.newUserForm.get('role').value);
    this.create(user);
    this.newUserForm.reset();
    this.newUserForm.markAsUntouched();
    this.openPanelState = false;
  }

  valid() {
    return !!this.dataSource.data;
  }

}
