import { Component, OnInit, Input } from '@angular/core';
import { UploadModel } from '@repository/model/upload.model';
import { Global } from 'app/g';

@Component({
  selector: 'app-tab-upload-info',
  templateUrl: './tab-upload-info.component.html',
  styleUrls: ['./tab-upload-info.component.scss']
})
export class TabUploadInfoComponent implements OnInit {
  private _createdTime;
  private _updatedTime;
  private _totalSize;
  private _type;
  private _status;
  @Input() selectedRow: UploadModel | any;
  constructor(public global: Global) { }

  ngOnInit() {
    this.selectedRow = {};
  }
  get createdTime() {
    return this.selectedRow.createdTime ? this.selectedRow.createdTime : '';
  }
  get updatedTime() {
    return this.selectedRow.updatedTime ? this.selectedRow.updatedTime : '';
  }
  get type() {
    return this.selectedRow.type ? this.selectedRow.type : '';
  }
  get status() {
    return this.selectedRow.status ? this.selectedRow.status : '';
  }
  get totalSize() {
    return this.selectedRow.totalSize ? this.selectedRow.totalSize : 0;
  }

}
