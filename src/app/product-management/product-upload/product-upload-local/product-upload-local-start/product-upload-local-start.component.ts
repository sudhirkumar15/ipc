import { Component, OnInit } from '@angular/core';

import { Global } from 'app/g';
import { ProductData } from '@repository/bucket/product.bucket';
import { UploadEventService } from '@core/upload-window/service/upload-event.service';
import { UploadApiService } from '@core/upload-window/service/upload-api.service';
import { UploadStoreService } from '@products/service/upload-store.service';
import { UploadPostModel } from '@repository/model/upload.model';
import { AssetModel } from '@repository/model/asset.model';

@Component({
  selector: 'app-product-upload-local-start',
  templateUrl: './product-upload-local-start.component.html',
  styleUrls: ['./product-upload-local-start.component.scss']
})
export class ProductUploadLocalStartComponent implements OnInit {
  dragarea = 'dragarea';
  constructor(public global: Global,
    private productData: ProductData,
    private uploadEvent: UploadEventService,
    private uploadApi: UploadApiService,
    private uploadStore: UploadStoreService
  ) { }

  ngOnInit() {
  }

  onFileChange(event) {
    this.saveFiles(event.target.files);
  }

  saveFiles(files) {
    const params: UploadPostModel = { upload: { type: 'local', assets: [] } };
    if (files.length > 0) {
      const filesArrayLength = files.length;
      for (let j = 0; j < filesArrayLength; j++) {
        const assetUniqueId = this.global.getUniqueId();
        const asset: AssetModel = { name: files[j].name, assetUniqueId: assetUniqueId, status: 'CLIENT_UPLOAD_START' };
        params.upload.assets.push(asset);
        asset.file = files[j];
        this.uploadStore.add(assetUniqueId, asset);
        this.productData.uploadToken.value = params;
        this.uploadApi.postUploadInfo();
        this.uploadEvent.localUploadApiEvent.next('local_upload_started,' + assetUniqueId);
      }
    }
  }
}


