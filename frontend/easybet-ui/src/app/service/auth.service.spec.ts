import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './auth.service';

describe('UserserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
