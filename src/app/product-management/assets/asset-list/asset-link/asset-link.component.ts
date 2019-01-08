import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

import { Global } from 'app/g';
import { PaginationModel } from '@repository/pagination.model';
import { ProductData } from '@repository/bucket/product.bucket';
import { ProductApiService } from '@products/service/product-api.service';
import { ProductListApiResponseModel } from '@repository/model/product.model';
import { AssetsPostModel } from '@repository/model/upload.model';
import { AssetProductLinksReponseModel } from '@repository/model/asset.model';
import { AssetLinkApiService } from '@products/service/asset-link-api.service';
import { AssetLinkData } from '@repository/bucket/asset-link.bucket';

@Component({
  selector: 'app-asset-link',
  templateUrl: './asset-link.component.html',
  styleUrls: ['./asset-link.component.scss'],
  providers: [ProductApiService]
})
export class AssetLinkComponent implements OnInit {
  private _show: boolean;
  refreshAssetLinkForm: boolean;
  @ViewChild('assetLink') assetLink: TemplateRef<any>;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  @Output() close = new EventEmitter<string>();
  @Input()
  set show(v: boolean) {

    this._show = v;
  }

  get show(): boolean {
    return this._show;
  }

  constructor(
    public global: Global,
    public productData: ProductData,
    private productApi: ProductApiService,
    private assetLinkApi: AssetLinkApiService,
    private assetLinkData: AssetLinkData
  ) { }

  ngOnInit() {
    this.refreshAssetLinkForm = false;
    this.assetLinkApi.apiEvent.subscribe((event) => this.handleAssetLinkTypes(event));
  }

  private handleAssetLinkTypes(event: string) {
    switch (event) {
      case 'asset_link_type_list_received':
        break;
      case 'close_modal':
        this.show = false;
        break;
    }
  }

  onShown(event) {
    setTimeout(() => {
      if (this.staticTabs) {
        this.staticTabs.tabs[1].disabled = true;
      }
    });
  }

  closeWindow(event: string) {
    this._show = false;
    this.close.emit('asset_link_closed');
  }

  onButtonAction(event) {
    switch (event) {
      case 'show_asset_link':
        this.staticTabs.tabs[1].disabled = false;
        this.staticTabs.tabs[1].active = true;
        this.refreshAssetLinkForm = true;
        break;
      case 'disable_asset_link':
        this.staticTabs.tabs[1].disabled = true;
        break;
    }
  }
}
