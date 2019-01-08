import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { AssetsApiService } from '@products/service/assets-api.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Global } from 'app/g';
import { PaginationModel } from '@repository/pagination.model';
import { ProductData } from '@repository/bucket/product.bucket';
import { AssetsListResponseModel, AssetResponseModel, AssetProductLinksReponseModel } from '@repository/model/asset.model';
import { timeout } from 'q';
import { UploadEventService } from '@core/upload-window/service/upload-event.service';
import { UploadStatusComponent } from '@core/upload-window/upload/upload-status/upload-status.component';
import { UploadPostModel } from '@repository/model/upload.model';
import { AssetModel } from '@repository/model/asset.model';
import { UploadApiService } from '@core/upload-window/service/upload-api.service';

@Component({
  selector: 'app-upload-assets',
  templateUrl: './upload-assets.component.html',
  styleUrls: ['./upload-assets.component.scss'],
  providers: [UploadApiService]
})

export class UploadAssetsComponent implements OnInit {
  modalRef: BsModalRef;
  private _show: boolean;
  selectedRows = [];
  page: PaginationModel;
  searchBy: string;
  sort: string;
  defaultSort = [{ prop: 'createdTime', dir: 'asc' }];
  dataLoader = false;
  assetsDataTableColumns: Array<{}> = [];
  errors: Array<string> = [];
  files: Array<any>;
  uploadComponents: { [key: string]: ComponentRef<UploadStatusComponent> } = {};
  isFilesUploading = false;
  @ViewChild('assetList') assetList: TemplateRef<any>;
  @ViewChild('uploadstatus', { read: ViewContainerRef }) container: ViewContainerRef;
  @Output() close = new EventEmitter<string>();
  @Input()
  set show(v: boolean) {
    this._show = v;
  }

  get show(): boolean {
    return this._show;
  }

  constructor(
    public global: Global,
    public assetApi: AssetsApiService,
    public productData: ProductData,
    private modalService: BsModalService,
    private uploadEvent: UploadEventService,
    private cfr: ComponentFactoryResolver,
    private uploadApi: UploadApiService,
  ) { }

  ngOnInit() {
    this.initModel();
    this.assetsTableColumns();
    this.onSortByAction(this.getDefaultSort());
  }

  closeWindow(event: string) {
    this._show = false;
    this.close.emit('upload_assets_closed');
  }

  add({ selectedRows }) {
    this._show = false;
  }

  onFileChange(event) {
    this.saveFiles(event.target.files);
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

  private initModel() {
    this.page = {
      isFirst: false,
      isLast: false,
      pageNumber: 0,
      pageSize: (this.global.config['pageSizes'][0]) ? this.global.config['pageSizes'][0] : 0,
      totalPages: 0,
      totalCount: 0
    };
    const responseModel: AssetsListResponseModel | any = {};
    responseModel.data = {
      uploads: [], _pagination: this.page
    };
    this.productData.assetList.value = responseModel;
  }

  pageAction(pagination: PaginationModel) {
    this.productData.assetList.value.data._pagination = pagination;
    this.getAssets();
  }

  onSortByAction(event: {
    sorts
    column
    prevValue
    newValue
  }) {
    this.sort = event.column.prop + ',' + event.newValue;
    this.getAssets();
  }

  private getDefaultSort() {
    return {
      sorts: '',
      column: {
        prop: this.defaultSort[0].prop
      },
      prevValue: '',
      newValue: this.defaultSort[0].dir
    };
  }

  private getAssets() {
    this.assetApi.getAssets(this.searchBy, this.sort);
  }

  private assetsTableColumns() {
    const columns = [];
    const timeStamp = {
      prop: 'createdTime',
      lockCol: true,
      name: this.global.language.timeStampUtc,
      sortable: true,
      minWidth: 170
    };
    const batchCol = {
      prop: 'name',
      lockCol: true,
      name: this.global.language.name,
      sortable: false
    };
    const uploadMethodCol = {
      prop: 'currentVersion',
      lockCol: true,
      name: this.global.language.version,
      sortable: false
    };
    columns.push(
      {
        headerCheckboxable: true,
        checkboxable: true,
        width: 40,
        sortable: false,
        canAutoResize: false,
        resizeable: false,
        draggable: false
      }
    );
    columns.push(timeStamp);
    columns.push(batchCol);
    columns.push(uploadMethodCol);
    this.assetsDataTableColumns = columns;
  }

}
