import {inject, TestBed} from '@angular/core/testing';

import {InterceptorService} from './interceptor.service';
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

describe('InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterceptorService, TokenService, Router]
    });
  });

  it('should be created', inject([InterceptorService], (service: InterceptorService) => {

  }));
});
