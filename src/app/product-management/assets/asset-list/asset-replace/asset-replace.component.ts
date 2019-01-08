import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AssetsApiService } from '@products/service/assets-api.service';
import { AssetsApiEventService } from '@products/service/assets-api-event.service';
import { AssetProductLinksReponseModel } from '@repository/model/asset.model';
import { ProductData } from '@repository/bucket/product.bucket';

@Component({
  selector: 'app-asset-replace',
  templateUrl: './asset-replace.component.html',
  styleUrls: ['./asset-replace.component.scss']
})
export class AssetReplaceComponent implements OnInit {
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
  @ViewChild('assetReplace') assetDelete: TemplateRef<any>;
  startUpload: boolean;

  constructor(private assetApi: AssetsApiService, private assetEvent: AssetsApiEventService,
    private productData: ProductData
  ) { }

  ngOnInit() {
    this.startUpload = false;
    this.assetEvent.apiEvent.subscribe((data) => {
      this.data = this.productData.assetProductLink.value;
    });
  }

  openModal() {
    this.assetApi.getAssetProductLinks(1);
  }

  closeWindow(event: string) {
    this._show = false;
    this.close.emit('asset_replace_closed');
    this.startUpload = false;
  }

  replace() {
    this.startUpload = true;
  }
}
