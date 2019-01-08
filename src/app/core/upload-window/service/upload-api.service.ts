import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { RestApiService } from '@services/rest-api.service';
import { ErrorService } from '@services/error.service';
import { ProductData } from '@repository/bucket/product.bucket';
import { UploadEventService } from '@core/upload-window/service/upload-event.service';
import { Global } from 'app/g';
import { UploadPostModel, AssetsPostModel } from '@repository/model/upload.model';

@Injectable()
export class UploadApiService extends RestApiService {
  private baseUploadUrl: string;
  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    private productData: ProductData,
    private uploadEvent: UploadEventService
  ) {
    super(http, router, errorService);
    this.baseUploadUrl = this.global.config['domain'] +
      this.global.config['catelogservice'] +
      this.global.config['catelogserviceendpoints'].uploads;
  }

  private setUploadErrors(err: HttpErrorResponse) {
    this.uploadEvent.errorMessage = err.error.error.message;
    if (err.error.error.details && err.error.error.details[0]) {
      this.uploadEvent.errorMessage = err.error.error.details[0].message;
    }
  }

  postUploadInfo() {
    const response = this.post(this.baseUploadUrl, this.productData.uploadToken.value);
    response.subscribe(
      (data: UploadPostModel) => {
        this.productData.uploadToken.value.upload.id = data['data'].upload.id;
        this.productData.uploadToken.value.upload.credentials = data['data'].upload.credentials;
        this.productData.uploadToken.value.upload.tmpUploadPath = data['data'].upload.tmpUploadPath;
        for (let i = 0; i < this.productData.uploadToken.value.upload.assets.length; i++) {
          this.productData.uploadToken.value.upload.assets[i].id = data['data'].upload.assets[i].id;
        }
        this.uploadEvent.localUploadApiEvent.next('upload_id_created');
      },
      (err: HttpErrorResponse) => {
        this.handleGlobalError(err);
        this.uploadEvent.errorMessage = err.error.error.message;
        this.uploadEvent.localUploadApiEvent.next('upload_api_error');
      }
    );
  }

  addAssets(assets: AssetsPostModel) {
    const uploadApiUrl = this.baseUploadUrl + '/' + this.productData.uploadToken.value.upload.id + '/' + 'assets';
    const response = this.post(uploadApiUrl, assets);
    response.subscribe(
      (data: AssetsPostModel) => {
        const assetArrayLength = this.productData.uploadToken.value.upload.assets.length;
        for (let i = 0, j = 0; i < assetArrayLength; i++) {
          if (!this.productData.uploadToken.value.upload.assets[i].id) {
            this.productData.uploadToken.value.upload.assets[i].id = data['data'].assets[j].id;
            j++;
          }
        }
        this.uploadEvent.localUploadApiEvent.next('upload_id_created');
      },
      (err: HttpErrorResponse) => {
        this.handleGlobalError(err);
        this.setUploadErrors(err);
        if (err.status === 502) {
          this.uploadEvent.localUploadApiEvent.next('upload_bad_gateway');
        } else {
          this.uploadEvent.localUploadApiEvent.next('upload_add_asset_api_error');
        }
      }
    );
  }

  updateUploadAssetStatus(uploadId, assetId, status) {
    let uploadApiUrl = this.baseUploadUrl;
    const params: Object = {
      asset: {
        status: status
      }
    };
    uploadApiUrl += '/' + uploadId + '/assets/' + assetId;
    const response = this.patch(uploadApiUrl, params);
    response.subscribe(
      (data: UploadPostModel) => {
        this.uploadEvent.localUploadApiEvent.next('upload_status_updated,' + assetId);
      },
      (err: HttpErrorResponse) => {
        this.handleGlobalError(err);
        this.setUploadErrors(err);
        if (err.status === 502) {
          this.uploadEvent.localUploadApiEvent.next('upload_bad_gateway,' + assetId);
        } else {
          this.uploadEvent.localUploadApiEvent.next('upload_update_error,' + assetId);
        }
      }
    );
  }
}
