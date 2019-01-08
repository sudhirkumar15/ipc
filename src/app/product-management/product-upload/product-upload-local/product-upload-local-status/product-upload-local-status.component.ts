import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UploadEventService } from '@core/upload-window/service/upload-event.service';
import { UploadStoreService } from '@products/service/upload-store.service';
import { AwsUploadService } from '@services/aws-upload.service';
import { UploadModel } from '@repository/model/upload.model';
import { ProductData } from '@repository/bucket/product.bucket';
import { AssetModel } from '@repository/model/asset.model';

@Component({
  selector: 'app-product-upload-local-status',
  templateUrl: './product-upload-local-status.component.html',
  styleUrls: ['./product-upload-local-status.component.scss'],
  providers: [AwsUploadService]
})
export class ProductUploadLocalStatusComponent implements OnInit, OnDestroy {
  @Input() uploadUniqueId: string;
  uploadDetails: AssetModel;
  fileTypeClass: string;
  fileTransferedSize;
  isError: boolean;
  uploadCompleted: boolean;
  progress: number;
  awsUploadSubscription: Subscription;
  localUploadEventSubscription: Subscription;
  isRetry: false;
  constructor(
    private uploadEvent: UploadEventService,
    private uploadStore: UploadStoreService,
    private awsService: AwsUploadService,
    private productData: ProductData
  ) { }

  ngOnInit() {
    this.fileTypeClass = 'fa fa-files-o';
    this.isError = false;
    this.uploadCompleted = false;
    this.progress = 2;
    this.fileTransferedSize = 0;
    this.localUploadEventSubscription = this.uploadEvent.localUploadApiEvent.subscribe((event) => this.handleLocalUploadEvent(event));
    this.awsUploadSubscription = this.awsService.statusUpdate.subscribe((event) => this.handleUploadEvents(event));
  }

  ngOnDestroy() {
    this.localUploadEventSubscription.unsubscribe();
    this.awsUploadSubscription.unsubscribe();
  }

  private handleUploadEvents(event: any) {
    switch (event.status) {
      case 'ERROR_S3_UPLOAD':
        this.isError = true;
        this.uploadCompleted = true;
        break;
      case 'S3_UPLOAD_COMPLETED':
        this.uploadCompleted = true;
        break;
      case 'S3_UPLOAD_PROGRESS':
        this.updateUploadProgress(event.data);
        break;
    }
  }

  private updateUploadProgress(progress) {
    this.fileTransferedSize = progress.loaded;
    this.progress = Math.round(this.fileTransferedSize / progress.total * 100);
  }

  private handleLocalUploadEvent(event: string) {
    const eventItems = event.split(',');
    switch (event) {
      case 'upload_id_created':
        this.startUpload();
        break;
    }
  }

  private startUpload() {
    this.uploadDetails = this.uploadStore.get(this.uploadUniqueId);
    this.awsService.upload(this.productData.uploadToken.value.upload.credentials,
      this.productData.uploadToken.value.upload.tmpUploadPath, this.uploadDetails.file);
  }
}
