import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';
import {TokenService} from "./token.service";
import {AppComponent} from "../app.component";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class InterceptorService implements HttpInterceptor{
  constructor(private tokenService: TokenService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let authReq = request;
    if(this.tokenService.getToken() && this.tokenService.getToken()!='null') {
      authReq = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.tokenService.getToken())});
    }
      return next.handle(authReq).do(
        res => {console.log(res);},
        err => {
          if(err instanceof HttpErrorResponse) {
            if(err.status == 401 || err.status == 403) {
              this.tokenService.logout();
              this.router.navigate(['login']);
              setTimeout(() => AppComponent.blockUi.stop(), 500);
            }
          }
        }
      )
  }


}
