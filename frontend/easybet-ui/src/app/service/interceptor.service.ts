import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent,
  HttpUserEvent
} from "@angular/common/http";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';

const TOKEN_HEADER_KEY = 'Authorization'

@Injectable()
export class InterceptorService implements HttpInterceptor{

  constructor(private token: TokenService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let authReq = request;
    console.log(this.token.getToken());
    if(this.token.getToken() && this.token.getToken()!='null') {
      authReq = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }
    return next.handle(authReq).do(
      res => {console.log(res)},
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status == 401 || err.status == 403) {
            this.router.navigate(['login']);
          }
        }
      }
    )

  }
}
