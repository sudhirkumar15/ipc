import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { RestApiService } from '@services/rest-api.service';
import { ErrorService } from '@services/error.service';
import { Global } from 'app/g';
import { ProductTypeListApiResponseModel } from '@repository/model/product.model';
import { ProductTypeData } from '@repository/bucket/product-type.bucket';
import { FilterModel } from '@repository/model/application.model';

@Injectable()
export class ProductTypeApiService extends RestApiService {
  apiEvent = new Subject<any>();
  private apiBase: string;
  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    private productTypeData: ProductTypeData
  ) {
    super(http, router, errorService);
    this.apiBase = global.config['domain'] +
      global.config['catelogservice'] + global.config['catelogserviceendpoints'].productTypes;
  }

  getProductTypes(filter?: string, sort?: string, tableFilter?: FilterModel) {
    const params: Object = {};
    if (tableFilter) {
      for (const key in tableFilter) {
        if (tableFilter.hasOwnProperty(key)) {
          params[key] = tableFilter[key];
        }
      }
    }
    const request = this.get(this.apiBase, params);
    request.subscribe(
      (response: ProductTypeListApiResponseModel) => {
        this.productTypeData.productTypes = response.data.productTypes;
        this.apiEvent.next('product_types_list_received');
      },
      (err: HttpErrorResponse) => {
      }
    );
  }
}
