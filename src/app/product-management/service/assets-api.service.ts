import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { RestApiService } from '@services/rest-api.service';
import { ErrorService } from '@services/error.service';
import { Global } from 'app/g';
import { ProductData } from '@repository/bucket/product.bucket';
import { AssetsListResponseModel, AssetResponseModel, AssetProductLinksReponseModel } from '@repository/model/asset.model';
import { AssetsApiEventService } from '@products/service/assets-api-event.service';

@Injectable()
export class AssetsApiService extends RestApiService {

  private _dataLoader: boolean;
  private apiBase: string;
  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    private productData: ProductData,
    private assetApiEvent: AssetsApiEventService
  ) {
    super(http, router, errorService);
    this._dataLoader = false;
    this.apiBase = global.config['domain'] +
      global.config['catelogservice'];
  }

  get dataLoader(): boolean {
    return this._dataLoader;
  }

  set dataLoader(dataLoader: boolean) {
    this._dataLoader = dataLoader;
  }

  getAssets(filter?: string, colSortBy?: string) {
    this._dataLoader = true;
    const params: Object = {};
    params['page-number'] = this.productData.assetList.value.data._pagination.pageNumber.toString();
    params['page-size'] = this.productData.assetList.value.data._pagination.pageSize.toString();
    if (filter) {
      params['query'] = filter;
    }
    if (colSortBy) {
      params['order-by'] = colSortBy;
    }
    const uploadHistoryApiUrl = this.global.config['domain'] +
      this.global.config['catelogservice'] +
      this.global.config['catelogserviceendpoints'].assets;
    const response = this.get(uploadHistoryApiUrl, params);
    response.subscribe(
      (data: AssetsListResponseModel) => {
        this.assetApiEvent.apiEvent.next('asset_list_received');
        this.productData.assetList.value = data;
        this._dataLoader = false;
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
      }
    );
  }

  getUploadDetails(id: number) {
    this._dataLoader = true;
    const params: Object = {};
    const assetDetailsApiUrl = this.apiBase + this.global.config['catelogserviceendpoints'].uploads + '/' + id + '/' + 'assets';
    const response = this.get(assetDetailsApiUrl, params);
    response.subscribe(
      (data: AssetsListResponseModel) => {
        this.productData.assetList.value = data;
        this.assetApiEvent.apiEvent.next('asset_upload_details_received');
        this._dataLoader = false;
      },
      (err: HttpErrorResponse) => {
        this.assetApiEvent.apiEvent.next('asset_upload_details_received_error');
        this.handleRestError(err);
      }
    );
  }

  getAsset(id: number) {
    const params: Object = {};
    const assetDetailsApiUrl = this.apiBase +
      this.global.config['catelogserviceendpoints'].assets + '/' + id;
   // assetDetailsApiUrl = 'assets/data/asset.json';
    const response = this.get(assetDetailsApiUrl, params);
    response.subscribe(
      (data: AssetResponseModel) => {
        this.productData.asset.value = data;
        this.assetApiEvent.apiEvent.next('asset_details_received');
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
      }
    );
  }

  getAssetProductLinks(id: number) {
    const params: Object = {};
    let assetDetailsApiUrl = this.apiBase +
      this.global.config['catelogserviceendpoints'].assets + '/' + id;
    assetDetailsApiUrl = 'assets/data/asset-link.json';
    const response = this.get(assetDetailsApiUrl, params);
    response.subscribe(
      (data: AssetProductLinksReponseModel) => {
        this.productData.assetProductLink.value = data;
        this.assetApiEvent.apiEvent.next('asset_product_link_received');
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
      }
    );
  }
}

