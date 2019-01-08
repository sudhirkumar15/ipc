import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AssetModel } from '../../../data/model/asset.model';

@Injectable()
export class UploadEventService {
  /**
   * Key map to store file upload
   */
  private _uploadStatus: { [key: string]: AssetModel } = {};

  /**
   * Total File uploading  (Upload in progress)
   */
  private _totalUploadingFilesCount: number;
  /**
   *  Total fils dragged to upload
   */
  private _totalUploadFilesCount: number;
  /**
   * Upload status for completed uploads
   */
  private completedStatus = ['SERVER_UPLOAD_COMPELTED', 'ERROR_S3_UPLOAD', 'SERVER_UPLOAD_FAILED'];
  /**
   * Upload API communcation events
   */
  localUploadApiEvent = new Subject<any>();
  /**
   * Events communication for model handling like show,hide,minimise
   */
  uploadWindowAction = new Subject<string>();
  /**
   * When the upload created
   */
  timeStarted: Date;
  /**
   * Total bytes completed in uploads
   */
  uploadedBytes = 0;
  /**
   * Total Bytes ready for uploads
   */
  totalBytes = 0;
  /**
   * Time remianing to upload the files
   */
  remainingTime: number;

  errorMessage: string;

  constructor() {
    this._totalUploadingFilesCount = 0;
    this._totalUploadFilesCount = 0;
    this.totalBytes = 0;
  }

  public resetCounter() {
    this._totalUploadingFilesCount = 0;
    this._totalUploadFilesCount = 0;
    this.totalBytes = 0;
  }

  public calculateTimeRemaining() {
    const timeNow = new Date();
    const timeElapsed = timeNow.getTime() - this.timeStarted.getTime(); // assumng that timeStarted is a Date Object
    const uploadSpeed = Math.round(this.uploadedBytes / (timeElapsed / 1000)); // upload speed in second
    this.remainingTime = (this.totalBytes - this.uploadedBytes) / uploadSpeed;
    if (this.remainingTime < 0) {
      this.remainingTime = 0;
    }
  }

  get totalUploadingFilesCount() {
    return this._totalUploadingFilesCount;
  }
  set totalUploadingFilesCount(count: number) {
    this._totalUploadingFilesCount += count;
  }

  get totalUploadFilesCount() {
    return this._totalUploadFilesCount;
  }

  public addTotalBytes(fileSize: number) {
    if (this.totalBytes <= 0) {
      this.timeStarted = new Date();
    }
    this.totalBytes += fileSize;
  }

  public addUploadedBytes(fileSize: number) {
    this.uploadedBytes = this.uploadedBytes + fileSize;
  }
  public addUploadStatus(key: string, newAsset: AssetModel) {
    this._totalUploadFilesCount++;
    this._totalUploadingFilesCount++;
    this._uploadStatus[key] = newAsset;
  }

  public updateUploadStatus(key: string, updateAsset: AssetModel) {
    if (this.completedStatus.indexOf(updateAsset.status) > -1) {
      this._totalUploadingFilesCount--;
    }
    this._uploadStatus[key] = { ...this._uploadStatus[key], ...updateAsset };
    this.uploadWindowAction.next('refresh_upload_status');
  }

  public addUploadingFileCount() {
    this._totalUploadingFilesCount++;
  }

  public getUploadingFilesCount() {
    return Object.keys(this._uploadStatus).length;
  }

}
