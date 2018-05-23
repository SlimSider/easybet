import {inject, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../model/user";
import {HttpEvent} from "@angular/common/http";
import {ApiService} from "./api.service";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers: [UserService, ApiService]
    });
  });

  it('should be created', inject([HttpTestingController, UserService], (httpMock: HttpTestingController, service: UserService) => {
    const users = [new User("mockUser1"), new User("mockUser2")];
    service.getUsers((event) => {
      expect(event.body).toEqual(users);
      }
    );
  }));
});
