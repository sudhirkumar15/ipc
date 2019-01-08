import { Component, OnInit } from '@angular/core';

import { Global } from 'app/g';
import { ProductData } from '@repository/bucket/product.bucket';
import { UploadEventService } from '@core/upload-window/service/upload-event.service';
import { UploadApiService } from '@core/upload-window/service/upload-api.service';
import { UploadStoreService } from '@products/service/upload-store.service';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.scss'],
  providers: [ProductData, UploadEventService, UploadApiService, UploadStoreService]
})
export class ProductUploadComponent implements OnInit {

  constructor(public global: Global
  ) { }

  ngOnInit() {
  }
}
