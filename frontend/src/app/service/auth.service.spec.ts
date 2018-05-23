import {inject, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {ApiService} from "./api.service";

describe('UserserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, ApiService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {

  }));
});
