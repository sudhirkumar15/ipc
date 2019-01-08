import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter, Input, Output, } from '@angular/core';
import { Router } from '@angular/router';

import { RestApiService } from '../../../service/rest-api.service';
import { ErrorService } from '../../../service/error.service';
import { Global } from '../../../g';
import { UserData } from '../../../data/bucket/user.bucket';
import { UserApiResponseModel, UserApiPostModel } from '../../../data/model/user.model';
import { UserService } from '../service/user.service';
@Injectable()
export class UserApiService extends RestApiService {
  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    private userData: UserData,
    private userService: UserService,
  ) {
    super(http, router, errorService);
  }

  createUser() {
    const userApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].users;
    const userDetailObject: any = {
      user: {}
    };
    userDetailObject.user = this.userData.AddNewUserPostData.value;
    userDetailObject.user.phone = userDetailObject.user.countrycode + '-' + userDetailObject.user.phoneNumber;
    const response = this.post(userApiUrl, userDetailObject);
    response.subscribe(
      (apiResponse: UserApiPostModel) => {
        this.userData.AddNewUserPostData.value.id = apiResponse.data.user.id;
        this.userService.userEvent.next('user_created');
      },
      (err: HttpErrorResponse) => {
        this.userService.userEvent.next('user_creation_error');
        this.handleRestError(err);
      }
    );
  }

  assignRolesToUser() {
    let userRoleApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].users;
    userRoleApiUrl += this.userData.AddNewUserPostData.value.id + '/roles';
    const roles: any = {
      roles: {}
    };
    const request = this.post(userRoleApiUrl, this.userData.AddNewUserPostData.value.roles);
    request.subscribe(
      (response: UserApiPostModel) => {
        this.userService.userEvent.next('user_role_created');
      },
      (err: HttpErrorResponse) => {
        this.userService.userEvent.next('user_role_creation_error');
      }
    );
  }

  getUsers(filter, colSortBy) {
    this.userService.userListDataLoader = true;
    const params: Object = {};
    params['page-number'] = this.userData.UserListData.value.data._pagination.pageNumber.toString();
    params['page-size'] = this.userData.UserListData.value.data._pagination.pageSize.toString();
    if (filter) {
      params['query'] = filter;
    }
    if (colSortBy) {
      params['order-by'] = colSortBy;
    }
    const userApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].users;
    const response = this.get(userApiUrl, params);
    response.subscribe(
      (data: UserApiResponseModel) => {
        this.userData.UserListData.value = data;
        this.userService.userListDataLoader = false;
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
      }
    );
  }
}
