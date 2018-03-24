import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ApiService} from "./api.service";
import {User} from "../model/user";

@Injectable()
export class UserService {

  constructor(private api: ApiService) { }

  getUsers() : Observable<any> {
    return this.api.getRequest('http://localhost:8080/admin/get_users');
  }

  getUser(id: number) : Observable<any> {
    return this.api.getRequest('http://localhost:8080/user/get_user/' + id);
  }

  // getUser(username: string) : Observable<any> {
  //   return this.api.getRequest('http://localhost:8080/user/get_user/' + id);
  // }

  delete(id: number) : Observable<any> {
    return this.api.deleteRequest('http://localhost:8080/admin/delete_user/' + id);
  }

  add(user: User) : Observable<any> {
    return this.api.postRequest('http://localhost:8080/register', user);
  }

  update(id: number, user: User) : Observable<any> {
    return this.api.putRequest('http://localhost:8080/admin/update_user/' + id, user);
  }
}
