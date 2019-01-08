import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter, Input, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { RestApiService } from '../../service/rest-api.service';
import { ErrorService } from '../../service/error.service';
import { Global } from '../../g';
import { ProductData } from '../../data/bucket/product.bucket';
import { ProductListApiResponseModel } from '../../data/model/product.model';
import { AssetsApiEventService } from './assets-api-event.service';
import { ProductService } from '../service/product.service';
import { FilterModel } from '@repository/model/application.model';

@Injectable()
export class ProductApiService extends RestApiService {
  apiEvent = new Subject<any>();
  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    private productData: ProductData
  ) {
    super(http, router, errorService);
  }

  getproducts(filter?: string, colSortBy?: string, tableFilter?: FilterModel) {
    const params: Object = {};
    params['page-number'] = this.productData.ProductListData.value.data._pagination.pageNumber.toString();
    params['page-size'] = this.productData.ProductListData.value.data._pagination.pageSize.toString();
    if (filter) {
      params['query'] = filter;
    }
    if (colSortBy) {
      params['order-by'] = colSortBy;
    }
    if (tableFilter) {
      for (const key in tableFilter) {
        if (tableFilter.hasOwnProperty(key)) {
          params[key] = tableFilter[key];
        }
      }
    }
    const productApiUrl = this.global.config['domain'] +
      this.global.config['catelogservice'] +
      this.global.config['catelogserviceendpoints'].products;
    const response = this.get(productApiUrl, params);
    response.subscribe(
      (data: ProductListApiResponseModel) => {
        this.productData.ProductListData.value = data;
        this.apiEvent.next('product_list_received');
      },
      (err: HttpErrorResponse) => {
        this.apiEvent.next('product_list_received_error');
        this.handleRestError(err);
      }
    );
  }
}
