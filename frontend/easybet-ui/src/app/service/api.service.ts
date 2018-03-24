import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getRequest(url: string) {
    return this.http.get(url, {observe: 'response'});
  }

  postRequest(url: string, body=null) {
    return this.http.post(url, body, {observe: 'response'});
  }

  deleteRequest(url: string) {
    return this.http.delete(url, {observe: 'response'});
  }

  putRequest(url: string, body) {
    return this.http.put(url, body,{observe: 'response'});
  }
}
