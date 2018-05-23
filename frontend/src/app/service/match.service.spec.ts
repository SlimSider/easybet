import {inject, TestBed} from '@angular/core/testing';

import {MatchService} from './match.service';
import {ApiService} from "./api.service";

describe('MatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchService, ApiService]
    });
  });

  it('should be created', inject([MatchService], (service: MatchService) => {

  }));
});
