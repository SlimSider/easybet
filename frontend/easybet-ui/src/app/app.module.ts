import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule} from "./material.module";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import {AuthService} from "./service/auth.service";
import {TokenService} from "./service/token.service";
import {InterceptorService} from "./service/interceptor.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './register/register.component';
import {UserComponent} from "./user-list/user-list.component";
import {UserService} from "./service/user.service";
import {ApiService} from "./service/api.service";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserBetlistComponent } from './user-betlist/user-betlist.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserPayinComponent } from './user-payin/user-payin.component';
import {MatchService} from "./service/match.service";
import {EventService} from "./service/event.service";
import { Match } from './match.manager/match.manager.component';
import { MatchManagerComponent } from './match-manager/match-manager.component';

const appRoutes : Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UserComponent},
  {path: 'profile/:id', component: UserProfileComponent},
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
    UserComponent,
    UserProfileComponent,
    UserBetlistComponent,
    UserOverviewComponent,
    UserUpdateComponent,
    UserPayinComponent,
    MatchManagerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    TokenService,
    UserService,
    ApiService,
    MatchService,
    EventService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
