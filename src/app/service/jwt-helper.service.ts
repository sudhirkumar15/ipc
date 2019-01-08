import { Injectable } from '@angular/core';
import { LoginUser } from '../data/bucket/login-user.bucket';

@Injectable()
export class JwtHelperService {

  constructor(private user: LoginUser) { }

  setUserInfo(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    this.user.UserInfo.value = JSON.parse(window.atob(base64));
  }

}
