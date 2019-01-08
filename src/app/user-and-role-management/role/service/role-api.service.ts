import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Global } from '../../../g';
import { RoleData } from '../../../data/bucket/role.bucket';
import { RestApiService } from '../../../service/rest-api.service';
import { RoleListAPIResponseModel, RoleResourceAPIResponseModel } from '../../../data/model/role.model';
import { RoleService } from '../service/role.service';
import { ErrorService } from '../../../service/error.service';
import { RoleEventService } from '../service/role-event.service';
import { AuthEventService } from 'app/auth/service/auth-event.service';
@Injectable()
export class RoleApiService extends RestApiService {

  constructor(
    private global: Global,
    private roleData: RoleData,
    private http: HttpClient,
    router: Router,
    private roleService: RoleService,
    errorService: ErrorService,
    private roleEvent: RoleEventService,
    private authEventService: AuthEventService,
  ) {
    super(http, router, errorService);
  }

  getroles(filter?: string, colSortBy?: string) {
    this.roleService.roleListDataLoader = true;
    const params: Object = {};
    params['page-number'] = this.roleData.RoleListData.value.data._pagination.pageNumber.toString();
    params['page-size'] = this.roleData.RoleListData.value.data._pagination.pageSize.toString();
    if (filter) {
      params['query'] = filter;
    }
    if (colSortBy) {
      params['order-by'] = colSortBy;
    }
    const roleApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].roles;
    const response = this.get(roleApiUrl, params);
    response.subscribe(
      (data: RoleListAPIResponseModel) => {
        this.roleData.RoleListData.value = data;
        this.roleEvent.roleApiEvent.next('getroles');
        this.roleService.roleListDataLoader = false;
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
        this.roleEvent.roleApiEvent.next('getroles_error');
      }
    );
  }

  createPermission(request) {
    const permissionApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      'permissions';
    const response = this.post(permissionApiUrl, request);
    response.subscribe(
      (data) => {
        this.roleEvent.roleApiEvent.next('rolepermission');
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
        this.errorService.setError(err);
      }
    );
  }

  addNewRole() {
    const request: any = {
      role: {}
    };
    request.role = this.roleData.AddNewRolePostData.value;
    const roleApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] + this.global.config['apiendpoints'].roles;
    const response = this.post(roleApiUrl, request);
    response.subscribe(
      (data: any) => {
        this.roleData.AddNewRolePostData.value = data;
        this.roleEvent.roleApiEvent.next('assignrights');
      },
      (err: any) => {
        this.handleRestError(err);
      }
    );
  }

  getResourceGroups() {
    const resourceApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].resourceGroups;
    const params: Object = {};
    const response = this.get(resourceApiUrl, params);
    response.subscribe(
      (data: RoleResourceAPIResponseModel) => {
        this.roleData.RoleResourcePostData.value = data;
        this.roleEvent.roleApiEvent.next('resourcegroup');
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
        this.roleEvent.roleApiEvent.next('resourceapierror');
      }
    );
  }

  getUserPermission(roles: Array<number>): void {
    const resourceApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].roles + '/' + roles[0] + '/resourceGroups';
    const params: Object = {};
    const response = this.get(resourceApiUrl, params);
    response.subscribe(
      (data: RoleResourceAPIResponseModel) => {
        this.roleData.RoleUserData.value = data;
        this.authEventService.authEvent.next('user_resourcegroup');
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
        this.authEventService.authEvent.next('user_resourceapierror');
      }
    );
  }
}
