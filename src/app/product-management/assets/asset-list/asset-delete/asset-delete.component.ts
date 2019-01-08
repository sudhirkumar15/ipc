import { Component, EventEmitter, Input, Output, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AssetsApiService } from '@products/service/assets-api.service';
import { AssetsApiEventService } from '@products/service/assets-api-event.service';
import { AssetProductLinksReponseModel } from '@repository/model/asset.model';
import { ProductData } from '@repository/bucket/product.bucket';

@Component({
  selector: 'app-asset-delete',
  templateUrl: './asset-delete.component.html',
  styleUrls: ['./asset-delete.component.scss']
})
export class AssetDeleteComponent implements OnInit {
  private _show: boolean;
  data: AssetProductLinksReponseModel;
  @Input()
  set show(v: boolean) {
    this._show = v;
    this.openModal();
  }

  get show(): boolean {
    return this._show;
  }
  @Output() close = new EventEmitter<string>();
  @ViewChild('assetDelete') assetDelete: TemplateRef<any>;
  constructor(private assetApi: AssetsApiService, private assetEvent: AssetsApiEventService,
    private productData: ProductData
  ) { }

  ngOnInit() {
    this.assetEvent.apiEvent.subscribe((data) => {
      this.data = this.productData.assetProductLink.value;
    });
  }

  openModal() {
    this.assetApi.getAssetProductLinks(1);
  }

  closeWindow(event: string) {
    this._show = false;
    this.close.emit('asset_delete_closed');
  }
}
