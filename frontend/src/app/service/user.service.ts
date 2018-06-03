import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {User} from "../model/user";

@Injectable()
export class UserService {

  constructor(private api: ApiService) { }

  getUsers(next, error?, params?, complete?) {
    this.api.getRequest('/admin/get_users', next, error, params, complete);
  }

  getUserById(id: number, next, error?, params?, complete?) {
    this.api.getRequest('/user/get_user_id/' + id, next, error, params, complete);
  }

  getUserByUsername(username: string, next, error?, params?, complete?) {
    this.api.getRequest('/user/get_user_name/' + username, next, error, params, complete);
  }

  delete(id: number, next, error?, complete?) {
    this.api.deleteRequest('/admin/delete_user/' + id, next, error, complete);
  }

  add(user: User, next, error?, complete?) {
    this.api.postRequest('/register', user, next, error, complete);
  }

  login(user: User, next, error?, complete?) {
    this.api.postRequest('/login', user, next, error, complete);
  }

  update(user: User, next, error?, complete?) {
    this.api.putRequest('/user/update_user', user, next, error, complete);
  }
}
