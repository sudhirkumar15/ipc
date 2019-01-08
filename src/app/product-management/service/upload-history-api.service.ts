import { Injectable } from '@angular/core';
import { RestApiService } from '../../service/rest-api.service';
import { ErrorService } from '../../service/error.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../g';
import { ProductData } from '../../data/bucket/product.bucket';
import { UploadHistoryResponseModel, UploadPostModel, UploadInfoResponseModel } from '../../data/model/upload.model';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class UploadHistoryApiService extends RestApiService {

  private _dataLoader: boolean;

  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    private productData: ProductData,
  ) {
    super(http, router, errorService);
    this._dataLoader = false;
  }

  get dataLoader(): boolean {
    return this._dataLoader;
  }

  set dataLoader(dataLoader: boolean) {
    this._dataLoader = dataLoader;
  }

  getUploadHistory(filter?: string, colSortBy?: string) {
    this._dataLoader = true;
    const params: Object = {};
    params['page-number'] = this.productData.uploadList.value.data._pagination.pageNumber.toString();
    params['page-size'] = this.productData.uploadList.value.data._pagination.pageSize.toString();
    if (filter) {
      params['query'] = filter;
    }
    if (colSortBy) {
      params['order-by'] = colSortBy;
    }
    const uploadHistoryApiUrl = this.global.config['domain'] +
      this.global.config['catelogservice'] +
      this.global.config['catelogserviceendpoints'].uploads;
    const response = this.get(uploadHistoryApiUrl, params);
    response.subscribe(
      (data: UploadHistoryResponseModel) => {
        this.productData.uploadList.value = data;
        this._dataLoader = false;
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
      }
    );
  }

  getUploadInfo(data: any) {
      this.productData.uploadInfo.value['data']['uploads'] = [data];
  }
}
