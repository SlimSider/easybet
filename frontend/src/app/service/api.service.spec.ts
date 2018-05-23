import {inject, TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TokenService} from "./token.service";
import {HttpClient} from "@angular/common/http";

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, TokenService, HttpClient]
    });
  });

  it('should be created', inject([HttpTestingController, ApiService], (httpMock : HttpTestingController, http: HttpClient, token: TokenService, service: ApiService) => {



  }));
});
