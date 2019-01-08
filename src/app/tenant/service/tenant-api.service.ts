import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { RestApiService } from '@services/rest-api.service';
import { ErrorService } from '@services/error.service';
import { Global } from 'app/g';
import { TenantData } from '@repository/bucket/tenant.bucket';
import { TenantApiResponseModel } from '@repository/model/tenant.model';
import { TenantService } from '@tenants/service/tenant.service';

@Injectable()
export class TenantApiService extends RestApiService {
  tenantApiEvent = new Subject<any>();
  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    public tenantData: TenantData,
    private tenantService: TenantService
  ) {
    super(http, router, errorService);
  }

  getTenantList(filter, colSortBy) {
    const params: Object = {};
    params['page-number'] = this.tenantData.pagination.pageNumber.toString();
    params['page-size'] = this.tenantData.pagination.pageSize.toString();
    if (filter) {
      params['query'] = filter;
    }
    if (colSortBy) {
      params['order-by'] = colSortBy;
    }
    const tenantApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].tenantlist;
    const request = this.get(tenantApiUrl, params);
    request.subscribe(
      (response: TenantApiResponseModel) => {
        this.tenantData.tenants = response.data.tenants;
        this.tenantData.pagination = response.data._pagination;
        this.tenantApiEvent.next('tenant_list_received');
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
        this.tenantApiEvent.next('tenant_list_received_error');
      }
    );
  }
  createNewTenant() {
    const tenantApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].tenantlist;
    const tenantDetails: any = {
      tenant: {}
    };
    tenantDetails.tenant = this.tenantData.tenant;
    const response = this.post(tenantApiUrl, tenantDetails);
    response.subscribe(
      (data: TenantApiResponseModel) => {
        this.router.navigate(['/tenants']);
        this.global.apiSuccess = this.global.language.newTenantAdded;
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
      }
    );
  }
}
