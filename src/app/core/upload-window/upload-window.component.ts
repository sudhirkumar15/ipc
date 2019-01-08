import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { UploadEventService } from '@core/upload-window/service/upload-event.service';
import { UploadComponent } from '@core/upload-window/upload/upload.component';
import { Global } from 'app/g';
import { UploadApiService } from '@core/upload-window/service/upload-api.service';
import { AwsUploadService } from '@services/aws-upload.service';

@Component({
  selector: 'app-upload-window',
  templateUrl: './upload-window.component.html',
  styleUrls: ['./upload-window.component.scss'],
  providers: [UploadApiService, AwsUploadService]
})
export class UploadWindowComponent implements OnInit, OnDestroy {
  isActive: boolean;
  uploadEventSubscription: Subscription;
  uploadFilesCount: number;
  uploadingFilePercentage: string;
  @ViewChild('staticModal') staticModal: ModalDirective;
  remainingTime: number;
  closewindow: boolean;
  totalFileUploaded: number;
  constructor(private uploadEvent: UploadEventService,
    public global: Global) { }

  ngOnInit() {
    this.totalFileUploaded = 0;
    this.closewindow = false;
    this.uploadingFilePercentage = '';
    this.isActive = false;
    this.uploadFilesCount = this.uploadEvent.totalUploadingFilesCount;
    this.uploadEventSubscription = this.uploadEvent.uploadWindowAction.subscribe(event =>
      this.handleUploadWindowAction(event));
  }

  ngOnDestroy() {
    this.uploadEventSubscription.unsubscribe();
  }

  private refreshUploadFilesCount() {
    this.uploadFilesCount = this.uploadEvent.totalUploadingFilesCount;
    this.remainingTime = this.uploadEvent.remainingTime;
    const totalFiles = this.uploadEvent.totalUploadFilesCount;
    const uploadingPercentage = ((totalFiles - this.uploadFilesCount) / totalFiles) * 100;
    this.uploadingFilePercentage = uploadingPercentage + '%';
    this.totalFileUploaded = this.uploadEvent.totalUploadFilesCount;
  }

  private handleUploadWindowAction(action: string) {
    switch (action) {
      case 'show':
        this.closewindow = false;
        this.staticModal.show();
        break;
      case 'refresh_upload_status':
        this.refreshUploadFilesCount();
        break;
    }
  }

  private resetUpload() {
    this.uploadingFilePercentage = '';
    this.totalFileUploaded = 0;
    this.uploadFilesCount = 0;
    this.isActive = false;
  }

  closeUpload() {
    this.resetUpload();
    this.closewindow = true;
    this.staticModal.hide();
  }
}
