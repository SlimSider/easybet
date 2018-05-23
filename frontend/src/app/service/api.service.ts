import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {AppComponent} from "../app.component";

@Injectable()
export class ApiService {
  private authFn = data => {this.tokenSerive.saveToken(data.headers.get('authorization'));};

  constructor(private http: HttpClient, private tokenSerive: TokenService) { }

  getRequest(url: string, next, error?, params?, complete?) {
    const fn = (data) => {this.authFn(data); next(data); setTimeout(() => AppComponent.blockUi.stop(), 500);};
    const errorFn = (data) =>{this.authFn(data); error(data); setTimeout(() => AppComponent.blockUi.stop(), 500);};
    AppComponent.blockUi.start();
    if(params) {
      this.http.get(url, {params: params, observe: 'response'}).subscribe(fn, errorFn, complete);
    } else {
      this.http.get(url, {observe: 'response'}).subscribe(fn, errorFn, complete);
    }
  }

  postRequest(url: string, body=null, next, error?, complete?) {
    const fn = (data) => {this.authFn(data); next(data); setTimeout(() => AppComponent.blockUi.stop(), 500);};
    const errorFn = (data) =>{this.authFn(data); error(data); setTimeout(() => AppComponent.blockUi.stop(), 500);};
    AppComponent.blockUi.start();
    this.http.post(url, body, {observe: 'response'}).subscribe(fn, errorFn, complete);
  }

  deleteRequest(url: string, next, error?, complete?) {
    const fn = (data) => {this.authFn(data); next(data); setTimeout(() => AppComponent.blockUi.stop(), 500);};
    const errorFn = (data) =>{this.authFn(data); error(data); setTimeout(() => AppComponent.blockUi.stop(), 500);};
    AppComponent.blockUi.start();
    this.http.delete(url, {observe: 'response'}).subscribe(fn, errorFn, complete);
  }

  putRequest(url: string, body, next, error?, complete?) {
    const fn = (data) => {this.authFn(data); next(data); setTimeout(() => AppComponent.blockUi.stop(), 500);};
    const errorFn = (data) =>{this.authFn(data); error(data); setTimeout(() => AppComponent.blockUi.stop(), 500);};
    AppComponent.blockUi.start();
    this.http.put(url, body, {observe: 'response'}).subscribe(fn, errorFn, complete);
  }
}
