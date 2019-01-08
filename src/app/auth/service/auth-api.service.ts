import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router/';

import { RestApiService } from '@services/rest-api.service';
import { Global } from 'app/g';
import { ErrorService } from '@services/error.service';
import { LoginUser } from '@repository/bucket/login-user.bucket';
import { LoginResponseModel } from '@repository/model/login-user.model';
import { AuthEventService } from '@auth/service/auth-event.service';
import { TenantResponseModel } from '@repository/model/tenant.model';
import { TenantData } from '@repository/bucket/tenant.bucket';

@Injectable()
export class AuthApiService extends RestApiService {

  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    private loginData: LoginUser,
    private tenantData: TenantData,
    private authEventService: AuthEventService
  ) {
    super(http, router, errorService);
  }

  login() {
    const loginApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].login;
    const response = this.post(loginApiUrl, this.loginData.LoginPostData.value);
    response.subscribe(
      (data: LoginResponseModel) => {
        this.loginData.LoginResponseData.value = data;
        this.authEventService.authEvent.next('login_ok');
      },
      (err: HttpErrorResponse) => {
        this.loginData.LoginResponseData.value = err.error;
        this.authEventService.authEvent.next('login_failed');
      }
    );
  }

  register() {
    const loginApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].register;
    const request = this.post(loginApiUrl, { tenant: this.tenantData.tenant });
    request.subscribe(
      (response: TenantResponseModel) => {
        this.tenantData.tenant = response.data.tenant;
        this.authEventService.authEvent.next('registration_ok');
      },
      (err: HttpErrorResponse) => {
        this.tenantData.error = err.error.error;
        this.authEventService.authEvent.next('registration_failed');
      }
    );
  }
}
