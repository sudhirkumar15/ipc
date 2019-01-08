import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    window.sessionStorage.clear();
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('isLoggedIn method should return true if there is token in session storage', inject([AuthService], (service: AuthService) => {
    window.sessionStorage.setItem('token', 'wedwdwdaklfbjdsfbdsfbd');
    expect(service.isLoggedIn()).toBe(true);
  }));

  it('isLoggedIn method should return false if there is no token in session storage', inject([AuthService], (service: AuthService) => {
      expect(service.isLoggedIn()).toBe(false);
  }));
});
