import { TestBed, inject } from '@angular/core/testing';

import { JwtHelperService } from './jwt-helper.service';
import { LoginUser } from '../data/bucket/login-user.bucket';

describe('JwtHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtHelperService, LoginUser]
    });
  });

  it('should be created', inject([JwtHelperService], (service: JwtHelperService) => {
    expect(service).toBeTruthy();
  }));
});
