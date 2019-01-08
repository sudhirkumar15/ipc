import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import * as AWS from 'aws-sdk';
import { UploadPostModel } from '../../../../data/model/upload.model';
import { UploadEventService } from '../../service/upload-event.service';
import { UploadApiService } from '../../service/upload-api.service';
import { AssetModel } from '../../../../data/model/asset.model';
import { Subscription } from 'rxjs/Subscription';
import { Global } from '../../../../g';
import { AwsUploadService } from '@services/aws-upload.service';

@Component({
  selector: 'app-upload-status',
  templateUrl: './upload-status.component.html',
  styleUrls: ['./upload-status.component.scss']
})
export class UploadStatusComponent implements OnInit, OnDestroy {
  ref: any;
  file: any;
  fileName: string;
  fileSize: number;
  progress: number;
  uploadError: any;
  uploadId: number;
  assetId: number;
  uploadDetails: UploadPostModel;
  uploadCompleted: boolean;
  assetUniqueId: string;
  fileTransferedSize: number;
  assetStatus: AssetModel;
  previousUploadedBytes: number;
  apiEventSubscription: Subscription;
  awsUploadSubscription: Subscription;
  fileTypeClass = 'fa fa-files-o';
  isError: boolean;
  isRetry: boolean;
  errorMessage: string;
  isShow: boolean;
  constructor(private uploadApi: UploadApiService,
    private apiEvent: UploadEventService,
    public global: Global,
    private awsService: AwsUploadService
  ) { }

  ngOnInit() {
    this.isShow = true;
    this.isError = false;
    this.isRetry = false;
    this.previousUploadedBytes = 0;
    this.progress = 2;
    this.fileName = '';
    this.fileSize = 0;
    this.fileTransferedSize = 0;
    this.uploadCompleted = false;
    this.assetStatus = {
      assetUniqueId: '',
      name: ''
    };
    this.apiEventSubscription = this.apiEvent.localUploadApiEvent.subscribe(event => this.handleApiEvent(event));
    this.awsUploadSubscription = this.awsService.statusUpdate.subscribe((event) => this.handleUploadEvents(event));

  }
  ngOnDestroy() {
    this.apiEventSubscription.unsubscribe();
    this.awsUploadSubscription.unsubscribe();
  }
  /**
  * expexting 'upload_status_updated,<aseet id>
  * to get update only in this asset
  * @param event
  */
  private handleApiEvent(event) {
    const eventStatus = event.split(',');
    if (this.assetId && eventStatus.indexOf(this.assetId.toString()) > -1) {
      switch (eventStatus[0]) {
        case 'upload_status_updated':
          this.assetStatus.status = 'SERVER_UPLOAD_COMPELTED';
          this.apiEvent.updateUploadStatus(this.assetUniqueId, this.assetStatus);
          this.uploadCompleted = true;
          break;
        case 'upload_bad_gateway':
          this.assetStatus.status = 'SERVER_UPLOAD_FAILED';
          this.errorMessage = this.apiEvent.errorMessage;
          this.apiEvent.updateUploadStatus(this.assetUniqueId, this.assetStatus);
          this.isError = true;
          this.isRetry = true;
          break;
        case 'upload_update_error':
          this.assetStatus.status = 'SERVER_UPLOAD_FAILED';
          this.errorMessage = this.apiEvent.errorMessage;
          this.apiEvent.updateUploadStatus(this.assetUniqueId, this.assetStatus);
          this.isError = true;
          this.isRetry = false;
          break;
      }
    }
  }

  private updateUploadStatus() {
    this.uploadApi.updateUploadAssetStatus(this.uploadId, this.assetId, 'UPLOAD_COMPLETE');
  }

  private handleUploadEvents(event: any) {
    switch (event.status) {
      case 'ERROR_S3_UPLOAD':
        this.handleAwsUploadError(event.data);
        break;
      case 'S3_UPLOAD_COMPLETED':
        this.handleAwsUploadSuccess();
        break;
      case 'S3_UPLOAD_PROGRESS':
        this.handleAwsUploadProgress(event.data);
        break;
    }
  }
  private handleAwsUploadError(err) {
    this.assetStatus.status = 'ERROR_S3_UPLOAD';
    this.errorMessage = err.message;
    this.apiEvent.updateUploadStatus(this.assetUniqueId, this.assetStatus);
    this.uploadError = err;
    this.isError = true;
    this.isRetry = err.retryable;
  }

  private handleAwsUploadProgress(progress) {
    this.fileTransferedSize = progress.loaded;
    this.progress = Math.round(this.fileTransferedSize / progress.total * 100);
    this.apiEvent.addUploadedBytes(this.fileTransferedSize - this.previousUploadedBytes);
    this.previousUploadedBytes = this.fileTransferedSize;
    this.apiEvent.calculateTimeRemaining();
    this.apiEvent.uploadWindowAction.next('refresh_upload_status');
  }

  private handleAwsUploadSuccess() {
    this.assetStatus.status = 'S3_UPLOAD_COMPLETED';
    this.apiEvent.updateUploadStatus(this.assetUniqueId, this.assetStatus);
    this.updateUploadStatus();
  }

  uploadFileToS3() {
    this.assetStatus = {
      assetUniqueId: this.assetUniqueId,
      name: this.file.name
    };
    this.assetStatus.status = 'S3_UPLOAD_IN_PROGRESS';
    this.apiEvent.updateUploadStatus(this.assetUniqueId, this.assetStatus);
    this.fileName = this.file.name;
    this.apiEvent.addTotalBytes(this.fileSize);
    this.awsService.upload(this.uploadDetails.upload.credentials,
      this.uploadDetails.upload.tmpUploadPath, this.file);
  }


  uploadFile() {
    this.fileSize = this.file.size;
    const filesizeMB = ((this.fileSize / 1024) / 1024); // MB
    if (filesizeMB > this.global.maxUploadFileSize) {
      this.isRetry = false;
      this.isError = true;
      this.errorMessage = this.global.language.upload_file_size_error;
      this.progress = 0;
      this.apiEvent.totalUploadingFilesCount = -1;
    } else {
      this.uploadFileToS3();
    }
  }

  uploadRetry() {
    this.isError = false;
    this.isRetry = false;
    this.apiEvent.addTotalBytes(-this.fileSize);
    this.apiEvent.addUploadedBytes(-this.fileTransferedSize);
    this.apiEvent.addUploadingFileCount();
    this.fileTransferedSize = 0;
    this.uploadFile();
  }

  setFileTypeClass(fileType: string) {
    switch (fileType) {
      case 'image/png':
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/gif':
        this.fileTypeClass = 'fa fa-file-image-o';
        break;
      case 'application/pdf':
        this.fileTypeClass = 'fa fa-file-pdf-o';
        break;
      default:
        this.fileTypeClass = 'fa fa-files-o';
    }
  }
}
