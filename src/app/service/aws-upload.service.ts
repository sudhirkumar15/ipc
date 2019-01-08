import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as AWS from 'aws-sdk';

import { Credentials } from '@repository/model/upload.model';

@Injectable()
export class AwsUploadService {
  statusUpdate = new Subject<{ status: string, data?: any }>();

  constructor() { }

  upload(credentials: Credentials, tmpUploadPath: string, file: any) {
    AWS.config.accessKeyId = credentials.accessKeyId;
    AWS.config.secretAccessKey = credentials.secretAccessKey;
    const s3 = new AWS.S3();
    const tempPath = tmpUploadPath.split('/');
    const uploadBucket = tempPath.shift();
    const params = { Bucket: uploadBucket, Key: tempPath.join('/') + '/' + file.name, Body: file };
    s3.upload((params), (err, data) => {
      if (err) {
        this.statusUpdate.next({ status: 'ERROR_S3_UPLOAD', data: err });
      } else {
        this.statusUpdate.next({ status: 'S3_UPLOAD_COMPLETED', data: {} });
      }
    }).on('httpUploadProgress', (progress) => {
      this.statusUpdate.next({ status: 'S3_UPLOAD_PROGRESS', data: progress });
    });
  }
}
