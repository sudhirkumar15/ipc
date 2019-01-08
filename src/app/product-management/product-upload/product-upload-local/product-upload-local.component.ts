import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Global } from 'app/g';
import { UploadEventService } from '@core/upload-window/service/upload-event.service';
import { ProductData } from '@repository/bucket/product.bucket';

@Component({
  selector: 'app-product-upload-local',
  templateUrl: './product-upload-local.component.html',
  styleUrls: ['./product-upload-local.component.scss']
})
export class ProductUploadLocalComponent implements OnInit, OnDestroy {
  dragAreaClass = 'dragarea';
  uploadUniqueId: string;
  localUploadApiEvent: Subscription;
  constructor(public global: Global,
    private productData: ProductData,
    private uploadEvent: UploadEventService
  ) { }

  ngOnInit() {
    this.localUploadApiEvent = this.uploadEvent.localUploadApiEvent.subscribe((event) => this.handleLocalUploadEvent(event));
  }

  ngOnDestroy() {
    this.localUploadApiEvent.unsubscribe();
  }

  private handleLocalUploadEvent(event: string) {
    const eventItems = event.split(',');
    switch (eventItems[0]) {
      case 'local_upload_started':
        this.uploadUniqueId = eventItems[1] ? eventItems[1] : '';
        break;
    }
  }
}
