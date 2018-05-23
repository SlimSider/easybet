import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-balance-charge',
  templateUrl: './balance-charge.component.html',
  styleUrls: ['./balance-charge.component.css']
})
export class BalanceChargeComponent implements OnInit {
  @Input()
  private user;
  balance: number;
  @Output()
  userChange = new EventEmitter();

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    console.log(this.user);
  }

  getMoney(balance) {
    console.log(balance);
    this.user.balance = this.user.balance + parseInt(balance);
    this.userService.update(this.user, res => {
      console.log(res);
      this.user = res.body;
      this.userChange.emit(this.user);
      this.authService.setCurrentUserBalance(this.user.balance);
    });
    console.log(this.user);
  }


}
