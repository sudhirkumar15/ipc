import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  isLoggedIn() {
    return (window.sessionStorage.token) ? true : false;
  }

}
