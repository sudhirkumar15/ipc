import { Injectable } from '@angular/core';

import { AssetModel } from '@repository/model/asset.model';

@Injectable()
export class UploadStoreService {

  private uploadFiles;
  constructor() {
    this.uploadFiles = new Map();
  }

  add(id: string, asset: AssetModel) {
    this.uploadFiles.set(id, asset);
  }

  get(id: string) {
    return this.uploadFiles.get(id);
  }
}
