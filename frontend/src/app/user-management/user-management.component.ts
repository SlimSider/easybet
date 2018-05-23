import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {User} from "../model/user";
import {UserUpdateDialogComponent} from "../user-update-dialog/user-update-dialog.component";
import {UserBetListDialogComponent} from "../user-bet-list-dialog/user-bet-list-dialog.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  newUserForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    balance: new FormControl('', [Validators.required, Validators.pattern("^0|^[1-9][0-9]*")]),
    role: new FormControl('', [Validators.required])
  });
  displayedColumns = ['username', 'email', 'balance', 'role', 'edit'];
  dataSource = new MatTableDataSource();
  error;

  constructor(private router: Router, private userService: UserService, private dialogRef: MatDialog) {
  }

  ngOnInit() {
  }

  update() {
    this.error = null;
    this.userService.getUsers(
      data => {
        this.dataSource.data = data.body;
      }
    )
  }

  delete(id: number) {
    this.userService.delete(id,
      res => {
        console.log(res);
        this.update();
      },
      err => {
        console.log(err);
      });
  }

  create(user: User) {
    this.userService.add(user,
      res => {
        console.log(res);
        if(this.dataSource.data.length) {
          this.update();
        }
      },
      err => {
        this.error = err.error;
      });
  }

  addUser() {
    const user = new User(this.newUserForm.get('username').value, this.newUserForm.get('email').value,
      this.newUserForm.get('password').value, this.newUserForm.get('balance').value,
      this.newUserForm.get('role').value);
    this.create(user);
    this.newUserForm.reset();
    this.newUserForm.markAsUntouched();
  }

  editUser(user: User) {
    let dialogRef = this.dialogRef.open(UserUpdateDialogComponent, {
      width: '550px',
      data: { user : user }
    });
    dialogRef.afterClosed().subscribe(user => {
      if(user) {
        console.log(user);
        this.userService.update(user, res => {
          console.log(res);
          this.update();
        });
      }
    });
  }

  hide() {
    this.dataSource.data = [];
  }

  seeBets(user: User) {
    let dialogRef = this.dialogRef.open(UserBetListDialogComponent, {
      width: '550px',
      data: { user : user }
    });
  }

}
