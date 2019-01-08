import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AssetsApiService } from '@products/service/assets-api.service';
import { AssetsListResponseModel } from '@repository/model/asset.model';
import { ProductData } from '@repository/bucket/product.bucket';
import { TableDetailsWindowEventService } from '@shared/service/table-details-window-event.service';
import { Global } from 'app/g';
import { AssetsApiEventService } from '@products/service/assets-api-event.service';

@Component({
  selector: 'app-tab-asset-info',
  templateUrl: './tab-asset-info.component.html',
  styleUrls: ['./tab-asset-info.component.scss']
})
export class TabAssetInfoComponent implements OnInit, OnDestroy {
  dataLoader = false;
  apiEvent: Subscription;
  modalEvent: Subscription;
  constructor(
    public global: Global,
    private event: TableDetailsWindowEventService,
    private assetListApi: AssetsApiService,
    private assetApiEvent: AssetsApiEventService,
    public productData: ProductData) { }

  ngOnInit() {
    this.init();
    this.apiEvent = this.assetApiEvent.apiEvent.subscribe((event) => this.handleApiEvent(event));
    this.modalEvent = this.event.tableDetailsWindowAction.subscribe((event) => this.handleEvent(event));
  }

  ngOnDestroy() {
    this.apiEvent.unsubscribe();
    this.modalEvent.unsubscribe();
  }
  private handleApiEvent(data) {
    switch (data) {
      case 'asset_upload_details_received':
        this.dataLoader = false;
        break;
    }
  }

  private handleEvent(data: string) {
    this.init();
    this.getAssetDetails(this.event.selectedRow.id);
  }

  private getAssetDetails(id: number) {
    this.dataLoader = true;
    this.assetListApi.getUploadDetails(id);
  }

  init() {
    const assetsResponseModel: AssetsListResponseModel | any = {};
    assetsResponseModel.data = {
      assets: []
    };
    this.productData.assetList.value = assetsResponseModel;
  }
}
