import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./service/auth.service";
import {InterceptorService} from "./service/interceptor.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from './register/register.component';
import {UserService} from "./service/user.service";
import {ApiService} from "./service/api.service";
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserBetlistComponent} from './user-betlist/user-betlist.component';
import {UserOverviewComponent} from './user-overview/user-overview.component';
import {UserUpdateComponent} from './user-update/user-update.component';
import {MatchService} from "./service/match.service";
import {MatchCardComponent} from './match-card/match-card.component';
import {ManagerProfileComponent} from './manager-profile/manager-profile.component';
import {AdminProfileComponent} from './admin-profile/admin-profile.component';
import {AdminOverviewComponent} from './admin-overview/admin-overview.component';
import {ManagerOverviewComponent} from './manager-overview/manager-overview.component';
import {ProfileComponent} from './profile/profile.component';
import {EventDialogComponent} from './event-dialog/event-dialog.component';
import {TicketDialogComponent} from './ticket-dialog/ticket-dialog.component';
import {NewMatchComponent} from './new-match/new-match.component';
import {MatchUpdateDialogComponent} from './match-update-dialog/match-update-dialog.component';
import {UserUpdateDialogComponent} from './user-update-dialog/user-update-dialog.component';
import {UserBetListDialogComponent} from "./user-bet-list-dialog/user-bet-list-dialog.component";
import {MatchManagementComponent} from './match-management/match-management.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {BalanceChargeComponent} from './balance-charge/balance-charge.component';
import {MatchListComponent} from './match-list/match-list.component';
import {NewMatchRemoteComponent} from './new-match-remote/new-match-remote.component';
import { TokenService } from './service/token.service';
import { BlockUIModule } from 'ng-block-ui';
import {BlockUIInstanceService} from "ng-block-ui/lib/services/block-ui-instance.service";
import { BetDetailsDialogComponent } from './bet-details-dialog/bet-details-dialog.component';
import { MatchHistoryComponent } from './match-history/match-history.component';

const appRoutes : Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard/:username', component: ProfileComponent},
  {path: 'match-list', component: MatchListComponent},
  {path: 'match-management', component: MatchManagementComponent},
  {path: 'user-management', component: UserManagementComponent},
  {path: 'match-history', component: MatchHistoryComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: ErrorComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    RegisterComponent,
    UserProfileComponent,
    UserBetlistComponent,
    UserOverviewComponent,
    UserUpdateComponent,
    MatchCardComponent,
    ManagerProfileComponent,
    AdminProfileComponent,
    AdminOverviewComponent,
    ManagerOverviewComponent,
    ProfileComponent,
    EventDialogComponent,
    TicketDialogComponent,
    NewMatchComponent,
    MatchUpdateDialogComponent,
    UserUpdateDialogComponent,
    UserBetListDialogComponent,
    MatchManagementComponent,
    UserManagementComponent,
    BalanceChargeComponent,
    MatchListComponent,
    NewMatchRemoteComponent,
    BetDetailsDialogComponent,
    MatchHistoryComponent
  ],
  entryComponents: [
    EventDialogComponent,
    TicketDialogComponent,
    MatchUpdateDialogComponent,
    UserUpdateDialogComponent,
    UserBetListDialogComponent,
    BetDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BlockUIModule.forRoot()
  ],
  providers: [
    AuthService,
    UserService,
    ApiService,
    MatchService,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
