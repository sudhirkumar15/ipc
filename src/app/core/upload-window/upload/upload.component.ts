import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UploadEventService } from '@core/upload-window/service/upload-event.service';
import { ProductData } from '@repository/bucket/product.bucket';
import { UploadStatusComponent } from '@core/upload-window/upload/upload-status/upload-status.component';
import { UploadPostModel } from '@repository/model/upload.model';
import { Global } from 'app/g';
import { AssetModel } from '@repository/model/asset.model';
import { UploadApiService } from '@core/upload-window/service/upload-api.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [UploadApiService]
})
export class UploadComponent implements OnInit, OnDestroy {
  errors: Array<string> = [];
  dragAreaClass = 'dragarea';
  @ViewChild('uploadstatus', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('template') template: TemplateRef<any>;
  files: Array<any>;
  uploadComponents: { [key: string]: ComponentRef<UploadStatusComponent> } = {};
  isFilesUploading = false;
  totalErrorCount: number;
  _uploadingFilesCount: number;
  totalFileUploaded: number;
  modalRef;
  activeErrors: boolean;
  activeAll: boolean;
  uploadEventSubscription: Subscription;

  constructor(
    private uploadEvent: UploadEventService,
    private uploadApi: UploadApiService,
    private productData: ProductData,
    private cfr: ComponentFactoryResolver,
    public global: Global,
  ) { }

  ngOnInit() {
    this.files = [];
    this.activeAll = true;
    this.activeErrors = false;
    this._uploadingFilesCount = 0;
    this.uploadEventSubscription = this.uploadEvent.localUploadApiEvent.subscribe(event =>
      this.handleUploadEvent(event));
  }

  ngOnDestroy() {
    this.uploadEventSubscription.unsubscribe();
  }

  @Input()
  set uploadingFilesCount(value: number) {
    this._uploadingFilesCount = value;
    this.totalFileUploaded = this.uploadEvent.totalUploadFilesCount;
    this.totalErrorCount = 0;
    for (const assetUniqueId in this.uploadComponents) {
      if (this.uploadComponents[assetUniqueId].instance.isError) {
        this.totalErrorCount++;
      }
    }
  }
  get uploadingFilesCount() {
    return this._uploadingFilesCount;
  }

  @Input()
  set closewindow(value: boolean) {
    this.isFilesUploading = false;
    this.files = [];
    this.productData.uploadToken.value = null;
    this.container.clear();
    this.totalFileUploaded = 0;
    this.uploadEvent.resetCounter();
  }
  private handleUploadEvent(event: string) {
    switch (event) {
      case 'upload_id_created':
        this.startUpload();
        break;
      case 'upload_api_error':
        this.uploadError();
        break;
    }
  }

  private uploadError() {
    for (let i = 0; i < this.productData.uploadToken.value.upload.assets.length; i++) {
      const assetUniqueId = this.productData.uploadToken.value.upload.assets[i].assetUniqueId;
      if (!this.uploadComponents[assetUniqueId].instance.assetId) {
        {
          this.uploadComponents[assetUniqueId].instance.errorMessage = this.uploadEvent.errorMessage;
          this.uploadComponents[assetUniqueId].instance.isError = true;
        }
      }
    }
  }

  private startUpload() {
    for (let i = 0; i < this.productData.uploadToken.value.upload.assets.length; i++) {
      const assetUniqueId = this.productData.uploadToken.value.upload.assets[i].assetUniqueId;
      if (!this.uploadComponents[assetUniqueId].instance.assetId) {
        this.uploadComponents[assetUniqueId].instance.file = this.files[i];
        this.uploadComponents[assetUniqueId].instance.uploadId = this.productData.uploadToken.value.upload.id;
        this.uploadComponents[assetUniqueId].instance.assetId = this.productData.uploadToken.value.upload.assets[i].id;
        this.uploadComponents[assetUniqueId].instance.uploadDetails = this.productData.uploadToken.value;
        this.uploadComponents[assetUniqueId].instance.uploadFile();
      }
    }
  }

  showErrors() {
    this.activeAll = false;
    this.activeErrors = true;
    for (const assetUniqueId in this.uploadComponents) {
      if (this.uploadComponents[assetUniqueId].instance.isError) {
        this.uploadComponents[assetUniqueId].instance.isShow = true;
      } else {
        this.uploadComponents[assetUniqueId].instance.isShow = false;
      }
    }
  }

  showAll() {
    this.activeAll = true;
    this.activeErrors = false;
    for (const assetUniqueId in this.uploadComponents) {
      if (!this.uploadComponents[assetUniqueId].instance.isShow) {
        this.uploadComponents[assetUniqueId].instance.isShow = true;
      }

    }
  }
  onFileChange(event) {
    this.saveFiles(event.target.files);
  }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.isFilesUploading = false;
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    this.saveFiles(files);
  }

  saveFiles(files) {
    this.errors = [];
    const params: UploadPostModel = { upload: { type: 'local', assets: [] } };
    if (files.length > 0) {
      const filesArrayLength = files.length;
      for (let j = 0; j < filesArrayLength; j++) {
        const assetUniqueId = this.global.getUniqueId();
        const asset: AssetModel = { name: files[j].name, assetUniqueId: assetUniqueId, status: 'CLIENT_UPLOAD_START' };
        params.upload.assets.push(asset);
        this.uploadEvent.addUploadStatus(assetUniqueId, asset);
        const comp = this.cfr.resolveComponentFactory(UploadStatusComponent);
        const c = this.container.createComponent(comp);
        c.instance.setFileTypeClass(files[j].type);
        this.uploadComponents[assetUniqueId] = c;
        this.uploadComponents[assetUniqueId].instance.assetUniqueId = assetUniqueId;
      }
      this.files.push(...files);
    }
    this.isFilesUploading = true;
    if (this.productData.uploadToken.value) {
      this.productData.uploadToken.value.upload.assets.push(...params.upload.assets);
      this.uploadApi.addAssets({ 'assets': params.upload.assets });
    } else {
      this.productData.uploadToken.value = params;
      this.uploadApi.postUploadInfo();
    }

  }
}
