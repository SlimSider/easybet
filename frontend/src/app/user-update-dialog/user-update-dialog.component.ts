import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventDialogComponent} from "../event-dialog/event-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.css']
})
export class UserUpdateDialogComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('', [Validators.maxLength(50)]),
    email: new FormControl('', [Validators.email]),
    balance: new FormControl('', [Validators.pattern("0 | [1-9][0-9]*")]),
    role: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<EventDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data.user);
  }

  done() : void {
    if(this.userForm.get('username').value) {
      this.data.user.username = this.userForm.get('username').value;
    }
    if(this.userForm.get('password').value) {
      this.data.user.password = this.userForm.get('password').value;
    }
    if(this.userForm.get('email').value) {
      this.data.user.email = this.userForm.get('email').value;
    }
    if(this.userForm.get('balance').value) {
      this.data.user.balance = this.userForm.get('balance').value;
    }
    if(this.userForm.get('role').value) {
      this.data.user.role = this.userForm.get('role').value;
    }
    console.log(this.data.user);
    this.dialogRef.close(this.data.user);
  }

}
