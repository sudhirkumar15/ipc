import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
  Input
} from '@angular/core';

import { Global } from 'app/g';
import { ScrollEvent } from '../../shared/directives/scroll.directive';
import { UploadHistoryResponseModel, UploadPostModel, UploadInfoResponseModel } from '../../data/model/upload.model';
import { AssetsListResponseModel } from '../../data/model/asset.model';
import { ProductData } from '../../data/bucket/product.bucket';
import { DataTableComponent } from '../../data-table/data-table.component';
import { PaginationModel } from '../../data/pagination.model';
import { UploadComponent } from '../../core/upload-window/upload/upload.component';
import { UploadEventService } from '../../core/upload-window/service/upload-event.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UploadHistoryApiService } from '../service/upload-history-api.service';
import { AssetsApiService } from '../service/assets-api.service';
import { TableDetailsWindowEventService } from '@shared/service/table-details-window-event.service';

@Component({
  selector: 'app-product-upload-history',
  templateUrl: './product-upload-history.component.html',
  styleUrls: ['./product-upload-history.component.scss'],
  providers: [TableDetailsWindowEventService, UploadHistoryApiService]
})
export class ProductUploadHistoryComponent implements OnInit {
  scroll: boolean;
  uploadHistoryDataTableColumns: Array<{}> = [];
  page: PaginationModel;
  searchBy: string;
  sort: string;
  actionItems: string[] = [
    this.global.language.upload_menu_action1,
    this.global.language.upload_menu_action2,
  ];
  selectedBatchName: string;
  @ViewChild('uploadHistoryActionsTemplate') uploadHistoryActionsTemplate: TemplateRef<any>;
  @ViewChild('uploadHistoryTimeStampTemplate') uploadHistoryTimeStampTemplate: TemplateRef<any>;
  @ViewChild('uploadHistoryBatchIdTemplate') uploadHistoryBatchIdTemplate: TemplateRef<any>;
  @ViewChild('productTableStatusTemplate') productTableStatusTemplate: TemplateRef<any>;
  @ViewChild('uploadHistoryFileSize') uploadHistoryFileSize: TemplateRef<any>;
  @ViewChild('uploadHistoryAssetsTemplate') uploadHistoryAssetsTemplate: TemplateRef<any>;
  defaultSort = [{ prop: 'createdTime', dir: 'desc' }];
  constructor(public global: Global,
    public uploadHistoryApi: UploadHistoryApiService,
    public assetListApi: AssetsApiService,
    public productData: ProductData,
    private uploadEvent: UploadEventService,
    private tableDetailsWindowEvent: TableDetailsWindowEventService,
  ) { }

  ngOnInit() {
    this.uploadHistoryTableColumns();
    this.initModel();
    this.onSortByAction(this.getDefaultSort());
  }

  assetDetailsData(data) {
    this.selectedBatchName = data.name;
    this.tableDetailsWindowEvent.selectedRow = data;
    this.tableDetailsWindowEvent.selectedTabIndex = 0;
    this.tableDetailsWindowEvent.tableDetailsWindowAction.next('show');
  }

  uploadInfoData(data) {
    this.tableDetailsWindowEvent.selectedRow = data;
    this.tableDetailsWindowEvent.selectedTabIndex = 1;
    this.tableDetailsWindowEvent.tableDetailsWindowAction.next('show');
    this.selectedBatchName = data.name;
  }

  showUpload() {
    this.uploadEvent.uploadWindowAction.next('show');
  }

  pageAction(pagination: PaginationModel) {
    this.productData.uploadList.value.data._pagination = pagination;
    this.getUploadHistory();
  }

  onSortByAction(event: {
    sorts
    column
    prevValue
    newValue
  }) {
    this.sort = event.column.prop + ',' + event.newValue;
    this.getUploadHistory();
  }

  private getDefaultSort() {
    return {
      sorts: '',
      column: {
        prop: 'createdTime'
      },
      prevValue: '',
      newValue: 'desc'
    };
  }

  private getUploadHistory(sort?: string) {
    this.uploadHistoryApi.getUploadHistory(this.searchBy, this.sort);
  }

  private getUploadInfo(data: Object) {
    this.uploadHistoryApi.getUploadInfo(data);
  }

  private uploadHistoryTableColumns() {

    const columns = [];

    const timeStamp = {
      prop: 'createdTime',
      lockCol: true,
      name: this.global.language.timeStampUtc,
      cellTemplate: this.uploadHistoryTimeStampTemplate,
      sortable: true,
      minWidth: 170
    };

    const batchCol = {
      prop: 'name',
      lockCol: true,
      name: this.global.language.upload_label_batch_id,
      cellTemplate: this.uploadHistoryBatchIdTemplate,
      sortable: false
    };
    const sizeCol = {
      prop: 'totalSize',
      lockCol: true,
      name: this.global.language.size,
      cellTemplate: this.uploadHistoryFileSize,
      sortable: false
    };

    const uploadMethodCol = {
      prop: 'type',
      lockCol: true,
      name: this.global.language.upload_label_upload_type,
      sortable: false
    };

    const assetsCountCol = {
      prop: 'totalAssets',
      name: this.global.language.assets,
      cellTemplate: this.uploadHistoryAssetsTemplate,
      sortable: false,
      width: 100
    };

    const productsCountCol = {
      prop: 'totalProducts',
      lockCol: true,
      name: this.global.language.products,
      sortable: false,
      width: 100
    };

    const statusCol = {
      prop: 'status',
      lockCol: false,
      name: this.global.language.status,
      sortable: false,
      cellTemplate: this.productTableStatusTemplate
    };

    const actionCol = {
      prop: 'action',
      name: this.global.language.actions,
      lockCol: false,
      sortable: false,
      cellTemplate: this.uploadHistoryActionsTemplate,
      width: 100

    };

    columns.push(timeStamp);
    columns.push(batchCol);
    columns.push(sizeCol);
    columns.push(uploadMethodCol);
    columns.push(assetsCountCol);
    columns.push(productsCountCol);
    columns.push(statusCol);
    columns.push(actionCol);
    this.uploadHistoryDataTableColumns = columns;

  }

  public handleScroll(event: ScrollEvent) {
    this.scroll = event.isTopScrolled;
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
    const responseModel: UploadHistoryResponseModel | any = {};
    responseModel.data = {
      uploads: [], _pagination: this.page
    };
    this.productData.uploadList.value = responseModel;

    const uploadInfoResponseModel: UploadInfoResponseModel | any = {};
    uploadInfoResponseModel.data = {
      uploadInfo: [], _pagination: this.page
    };
    this.productData.uploadInfo.value = uploadInfoResponseModel;
  }

  searchAction(event) {
    this.productData.uploadList.value.data._pagination.pageNumber = 0;
    this.productData.uploadList.value.data._pagination.totalCount = 0;
    this.searchBy = event;
    this.getUploadHistory();
  }

  getStatusCssClass(status: string): string {
    let statusClass = '';
    switch (status) {
      case 'FAILED':
        statusClass = 'badge badge-pill badge-danger bordered';
        break;
      case 'SUCESS':
        statusClass = 'badge badge-pill badge-success bordered';
        break;
      case 'COMPLETE':
        statusClass = 'badge badge-pill badge-success bordered';
        break;
      default:
        statusClass = 'badge badge-pill badge-danger bordered';
        break;
    }
    return statusClass;
  }
}
