import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { RestApiService } from '@services/rest-api.service';
import { ErrorService } from '@services/error.service';
import { Global } from 'app/g';
import { AssetLinkData } from '@repository/bucket/asset-link.bucket';
import { AssetPLinkTypeListResponseModel } from '@repository/model/asset.model';

@Injectable()
export class AssetLinkApiService extends RestApiService {
  apiEvent = new Subject<any>();
  private apiBase: string;
  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
    private global: Global,
    private assetLinkData: AssetLinkData,
  ) {
    super(http, router, errorService);
    this.apiBase = global.config['domain'] +
      global.config['catelogservice'] + global.config['catelogserviceendpoints'].assets + '/';
  }

  getAssetLinkTypes(assetRevisionId: number) {
    let assetLinkTypeUrl = `${this.apiBase}${assetRevisionId}/${this.global.config['catelogserviceendpoints'].linkTypes}`;
    assetLinkTypeUrl = 'assets/data/asset-link-types.json';
    const request = this.get(assetLinkTypeUrl, {});
    request.subscribe(
      (response: AssetPLinkTypeListResponseModel) => {
        this.assetLinkData.assetLinkTypes = response.data.linkTypes;
        this.apiEvent.next('asset_link_type_list_received');
      },
      (err: HttpErrorResponse) => {
        this.handleGlobalError(err);
      }
    );
  }

  updateProductAssetLink() {
    const assetLinkTypeUrl = this.global.config['domain'] +
      this.global.config['catelogservice'] + this.global.config['catelogserviceendpoints'].productLinkTypes;
    const request = this.patch(assetLinkTypeUrl, this.assetLinkData.assetProductLink);
    request.subscribe(
      (response: AssetPLinkTypeListResponseModel) => {
        this.assetLinkData.assetLinkTypes = response.data.linkTypes;
        this.apiEvent.next('asset_product_link_created');
      },
      (err: HttpErrorResponse) => {
        this.handleGlobalError(err);
      }
    );
  }

}
