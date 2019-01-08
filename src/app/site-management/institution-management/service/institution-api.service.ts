import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter, Input, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../../../service/rest-api.service';
import { ErrorService } from '../../../service/error.service';
import { Global } from '../../../g';
import { InstitutionData } from '../../../data/bucket/institution.bucket';
import { InstitutionApiResponseModel } from '../../../data/model/institution.model';
import { InstitutionEventService } from './institution-event.service';
import { SiteData } from '../../../data/bucket/site.bucket';
import { InstitutionService } from '../../institution-management/service/institution.service';
@Injectable()
export class InstitutionApiService extends RestApiService {
  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    private institutionData: InstitutionData,
    private institutionEvent: InstitutionEventService,
    private siteData: SiteData,
    private institutionService: InstitutionService
  ) {
    super(http, router, errorService);
  }
  getinstitutions(id: number, filter, colSortBy) {
    this.institutionService.institutionListDataLoader = true;
    const params: Object = {};
    params['page-number'] = this.institutionData.InstitutionListData.value.data._pagination.pageNumber.toString();
    params['page-size'] = this.institutionData.InstitutionListData.value.data._pagination.pageSize.toString();
    if (filter) {
      params['query'] = filter;
    }
    if (colSortBy) {
      params['order-by'] = colSortBy;
    }
    const institutionApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] + this.global.config['apiendpoints'].sites + '/' +
      id + '/' + this.global.config['apiendpoints'].institutions;

    const response = this.get(institutionApiUrl, params);
    response.subscribe(
      (data: InstitutionApiResponseModel) => {
        this.institutionData.InstitutionListData.value = data;
        this.institutionService.institutionListDataLoader = false;
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
      }
    );
  }
  createInstitutionInfo(id: number) {
    const institutionApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] + this.global.config['apiendpoints'].sites + '/' +
      id + '/' + this.global.config['apiendpoints'].institutions;
    const obj: any = {
      institution: {}
    };
    obj.institution = this.institutionData.AddNewInstitutiontData.value;
    obj.institution['isTrial'] = false;
    obj.institution['institutionTypeId'] = 1;
    const response = this.post(institutionApiUrl, obj);
    response.subscribe(
      (data: InstitutionApiResponseModel) => {
        this.institutionEvent.institutionApiEvent.next('institutionadmin');
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
      }
    );
  }
}
