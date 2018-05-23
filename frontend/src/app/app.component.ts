import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';
import { MatDialog } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @BlockUI() static blockUi : NgBlockUI;
  private guest_menu = [{link: '/home', title: 'Home'}];
  private user_menu = [{link: '/home', title: 'Home'}, {link: '/match-list', title: 'Match List'}, {link: '/match-history', title: 'Match results'}];
  private manager_menu = [{link: '/home', title: 'Home'}, {link: '/match-management', title: 'Match Management'}, {link: '/match-history', title: 'Match history'}];
  private admin_menu = [{link: '/home', title: 'Home'}, {link: '/match-management', title: 'Match Management'}, {link: '/user-management', title: 'User Management'}, {link: '/match-history', title: 'Match history'}];
  public static load : boolean = false;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
  }

  static startBlock(msg : string) {
    this.blockUi.start(msg);
  }

  static stopBlock() {
    this.blockUi.stop();
  }

  logout() {
    this.authService.logout();
  }
}
