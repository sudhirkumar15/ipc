import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginModel, LoginResponseModel } from '../../data/model/login-user.model';
import { LoginUser } from '../../data/bucket/login-user.bucket';
import { JwtHelperService } from '../../service/jwt-helper.service';
import { Global } from '../../g';
import { Util } from '../../util';
import { AuthApiService } from '../service/auth-api.service';
import { AuthEventService } from '../service/auth-event.service';
import { Subscription } from 'rxjs/Subscription';
import { ErrorService } from '../../service/error.service';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { OnError } from '../../data/model/application.model';
import { RoleApiService } from '@roles/service/role-api.service';
import { RoleService } from '@roles/service/role.service';
import { RoleEventService } from '@roles/service/role-event.service';
import { RoleData } from '@repository/bucket/role.bucket';
import { UserRoleService } from '@services/user-role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [RoleApiService, RoleService, RoleEventService]
})
export class LoginComponent implements OnInit, OnDestroy, OnError {
  loginForm: FormGroup;
  authEventSubscription: Subscription;
  showLoader = false;
  formSumitAttempt = false;
  constructor(
    private router: Router,
    private loginData: LoginUser,
    public global: Global,
    private jwtHelper: JwtHelperService,
    public util: Util,
    private fb: FormBuilder,
    private authApi: AuthApiService,
    private authEventService: AuthEventService,
    private errorService: ErrorService,
    private roleApi: RoleApiService,
    private user: LoginUser,
    private roleData: RoleData,
    private permissionService: UserRoleService
  ) { }

  ngOnInit() {
    this.createForm();
    this.authEventSubscription = this.authEventService.authEvent.subscribe(event => this.handleApiEvent(event));
  }
  ngOnDestroy() {
    this.authEventSubscription.unsubscribe();
  }
  private handleApiEvent(event) {
    switch (event) {
      case 'login_ok':
        this.global.token = this.loginData.LoginResponseData.value.data.token;
        window.sessionStorage.token = this.global.token;
        this.jwtHelper.setUserInfo(this.global.token);
        this.roleApi.getUserPermission(this.user.UserInfo.value.user_roles);
        break;
      case 'login_failed':
        this.showLoader = false;
        this.errorService.setError(this.loginData.LoginResponseData.value.error);
        break;
      case 'user_resourcegroup':
        this.showLoader = false;
        this.permissionService.allowedPermission = this.roleData.RoleUserData.value.data.resourceGroups;
        window.localStorage.setItem('permission', JSON.stringify(this.roleData.RoleUserData.value.data.resourceGroups));
        this.router.navigate(['/tenants']);
        break;
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.minLength(this.util.nameMinLength),
          Validators.maxLength(this.util.nameMaxLength),
          Validators.pattern(this.util.alphanumericSpecial)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(this.util.passwordMinLength)
        ]
      ]
    }
    );
  }

  login() {
    this.formSumitAttempt = true;
    if (this.loginForm.valid) {
      this.showLoader = true;
      this.loginData.LoginPostData.value = this.loginForm.value;
      this.authApi.login();
    }
  }

  isFieldValid(field: string) {
    return this.errorService.isFieldValid(this.loginForm, field, this.formSumitAttempt);
  }

  getErrorMessage(field: string) {
    return this.errorService.getErrorMessage(this.loginForm, 'login', field);
  }

  displayFieldCss(field: string) {
    return this.errorService.displayFieldCss(this.loginForm, field, this.formSumitAttempt);
  }
}
