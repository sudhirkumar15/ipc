import { Injectable } from '@angular/core';
import { RestApiService } from '@services/rest-api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from '@services/error.service';
import { Global } from 'app/g';
import { DefaultArgs } from '@repository/model/application.model';
import { UserGroupListApiReponseModel } from '@repository/model/user-group.model';
import { UserToUserGroupData } from '@repository/bucket/user-to-usergroup.bucket';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserGroupService extends RestApiService {
  apiEvent = new Subject<any>();
  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    private assignToUserGroup: UserToUserGroupData

  ) {
    super(http, router, errorService);
  }

  getUserGroups({ query = '', sort = '', filter = {} }: DefaultArgs) {
    const params: Object = {};
    //  params['page-number'] = this.userData.UserListData.value.data._pagination.pageNumber.toString();
    // params['page-size'] = this.userData.UserListData.value.data._pagination.pageSize.toString();
    if (query) {
      params['query'] = query;
    }
    if (sort) {
      params['order-by'] = sort;
    }
    const userApiUrl = `assets/data/classroom.json`;
    const request = this.get(userApiUrl, params);
    request.subscribe(
      (response: UserGroupListApiReponseModel) => {
        this.assignToUserGroup.userGroups = response.data.userGroups;
        this.assignToUserGroup.pagination = response.data._pagination;
        this.apiEvent.next('user_group_list_received');
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
        this.apiEvent.next('user_group_list_received_error');
      }
    );
  }

  assignUserToUserGroups() {
    this.apiEvent.next('user_to_usergroup_assigned');
  }

}
