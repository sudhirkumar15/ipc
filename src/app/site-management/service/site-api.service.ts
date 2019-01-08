import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter, Input, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../../service/rest-api.service';
import { ErrorService } from '../../service/error.service';
import { Global } from '../../g';
import { SiteData } from '../../data/bucket/site.bucket';
import { SiteApiResponseModel } from '../../data/model/site.model';
import { SiteEventService } from './site-event.service';
import { SiteService } from '../service/site.service';

@Injectable()
export class SiteApiService extends RestApiService {
  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    private siteData: SiteData,
    private siteEvent: SiteEventService,
    private siteService: SiteService
  ) {
    super(http, router, errorService);
  }

  getsites(filter?: string, colSortBy?: string) {
    this.siteService.siteListDataLoader = true;
    const params: Object = {};
    params['page-number'] = this.siteData.SiteListData.value.data._pagination.pageNumber.toString();
    params['page-size'] = this.siteData.SiteListData.value.data._pagination.pageSize.toString();
    if (filter) {
      params['query'] = filter;
    }
    if (colSortBy) {
      params['order-by'] = colSortBy;
    }
    const siteApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].sites;
    const response = this.get(siteApiUrl, params);
    response.subscribe(
      (data: SiteApiResponseModel) => {
        this.siteData.SiteListData.value = data;
        this.siteService.siteListDataLoader = false;
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
      }
    );
  }

  createSiteInfo() {
    const siteApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] +
      this.global.config['apiendpoints'].sites;
    const obj: any = {
      site: {}
    };
    obj.site = this.siteData.AddNewSitePostData.value;
    obj.site.url = obj.site.url.map((url) => {
      let tempUrl = this.global.language.hostName;
      tempUrl += url.name;
      tempUrl += this.global.language.fixDomain;
      url.name = tempUrl;
      return url;
    });
    obj.site.url = obj.site.url[0].name;

    const response = this.post(siteApiUrl, obj);
    response.subscribe(
      (data: SiteApiResponseModel) => {
        this.siteData.AddNewSitePostData.value.id = data.data['site'].id;
        this.siteEvent.siteApiEvent.next('siteadmin');
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
      }
    );
  }

}
