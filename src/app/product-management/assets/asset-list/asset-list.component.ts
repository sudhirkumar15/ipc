import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TabsetComponent } from 'ngx-bootstrap/tabs/tabset.component';

import { PaginationModel } from '@repository/pagination.model';
import { Global } from 'app/g';
import { ProductData } from '@repository/bucket/product.bucket';
import { ScrollEvent } from '@shared/directives/scroll.directive';
import { UploadHistoryResponseModel } from '@repository/model/upload.model';
import { AssetsApiService } from '@products/service/assets-api.service';
import { AssetsListResponseModel, AssetModel, AssetResponseModel, AssetProductLinksReponseModel } from '@repository/model/asset.model';
import { TableDetailsWindowEventService } from '@shared/service/table-details-window-event.service';
import { AssetsApiEventService } from '@products/service/assets-api-event.service';
import { ContextMenuModel } from '@repository/model/context-menu.model';
import { UploadEventService } from '@core/upload-window/service/upload-event.service';
import { AssetLinkApiService } from '@products/service/asset-link-api.service';
import { AssetLinkData } from '@repository/bucket/asset-link.bucket';
import { ProductTypeApiService } from '@products/service/product-type-api.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
  providers: [
    AssetLinkApiService,
    AssetLinkData,
    ProductTypeApiService
  ]
})
export class AssetListComponent implements OnInit, OnDestroy {
  scroll: boolean;
  assets: Array<AssetModel>;
  assetsDataTableColumns: Array<{}> = [];
  page: PaginationModel;
  searchBy: string;
  sort: string;
  defaultSort = [{ prop: 'createdTime', dir: 'asc' }];
  selectedRows = [];
  selectedRow: AssetModel = {};
  tabAssetLoader = false;
  tabAssetAssociationLoader = false;
  apiEventSubscription: Subscription;
  contextualMenu: Array<ContextMenuModel> = [];
  selectedMenuAction: string;
  actionItems: string[] = [
    this.global.language.manageInstitutions,
    this.global.language.manageProducts,
    this.global.language.visitSite,
    this.global.language.manageSiteAdminsUsers,
    this.global.language.editSiteInfoSettings,
    this.global.language.changeSiteStatus,
    this.global.language.deactivateDelete
  ];
  linkFiterItems: string[] = [
    this.global.language.true,
    this.global.language.false,
  ];
  statusFiterItems: string[] = [
    this.global.language.inProgress,
    this.global.language.success,
    this.global.language.warning,
  ];
  @ViewChild('actionsTemplate') actionsTemplate: TemplateRef<any>;
  @ViewChild('timeStampTemplate') timeStampTemplate: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @ViewChild('fileSizeTemplate') fileSizeTemplate: TemplateRef<any>;
  @ViewChild('isProductLinkTemplate') isProductLinkTemplate: TemplateRef<any>;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  @ViewChild('isPublishedHeaderTemplate') isPublishedHeaderTemplate: TemplateRef<any>;
  @ViewChild('statusHeaderTemplate') statusHeaderTemplate: TemplateRef<any>;

  constructor(public global: Global,
    public assetApi: AssetsApiService,
    private uploadEvent: UploadEventService,
    public productData: ProductData,
    private tableDetailsWindowEvent: TableDetailsWindowEventService,
    private assetApiEvent: AssetsApiEventService,
    private assetLinkData: AssetLinkData
  ) { }

  ngOnInit() {
    this.assetsTableColumns();
    this.initModel();
    this.createContextualMenu();
    this.onSortByAction(this.getDefaultSort());
    this.apiEventSubscription = this.assetApiEvent.apiEvent.subscribe((event) => this.handledApiEvent(event));
  }

  ngOnDestroy() {
    this.apiEventSubscription.unsubscribe();
  }

  private handledApiEvent(event) {
    switch (event) {
      case 'asset_list_received':
        this.assets = this.productData.assetList.value.data.assets;
        break;
      case 'asset_details_received':
        this.selectedRow = this.productData.asset.value.data.asset;
        this.tabAssetLoader = false;
        break;
      case 'asset_product_link_received':
        this.tabAssetAssociationLoader = false;
        break;
    }
  }

  private getTabData(id: number) {
    this.tabAssetAssociationLoader = true;
    this.tabAssetLoader = true;
    this.assetApi.getAsset(id);
    this.assetApi.getAssetProductLinks(id);
  }

  private createContextualMenu() {
    const editMenu: ContextMenuModel = {
      actionCode: 'edit',
      actionLabel: this.global.language.edit,
      isBulkAction: false
    };

    const replaceMenu: ContextMenuModel = {
      actionCode: 'replace',
      actionLabel: this.global.language.replace,
      isBulkAction: false
    };


    const linkMenu: ContextMenuModel = {
      actionCode: 'link',
      actionLabel: this.global.language.link,
      isBulkAction: false
    };

    const downloadMenu: ContextMenuModel = {
      actionCode: 'download',
      actionLabel: this.global.language.download,
      isBulkAction: true
    };

    const deleteMenu: ContextMenuModel = {
      actionCode: 'delete',
      actionLabel: this.global.language.delete,
      isBulkAction: true
    };
    this.contextualMenu.push(editMenu);
    this.contextualMenu.push(replaceMenu);
    this.contextualMenu.push(linkMenu);
    this.contextualMenu.push(downloadMenu);
    this.contextualMenu.push(deleteMenu);
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
      cellTemplate: this.timeStampTemplate,
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
    const sizeCol = {
      prop: 'fileSize',
      lockCol: true,
      name: this.global.language.size,
      cellTemplate: this.fileSizeTemplate,
      sortable: false
    };

    const assetsCountCol = {
      prop: 'isPublished',
      name: this.global.language.link,
      cellTemplate: this.isProductLinkTemplate,
      sortable: false,
      headerTemplate: this.isPublishedHeaderTemplate
    };

    const statusCol = {
      prop: 'isActive',
      lockCol: false,
      name: this.global.language.status,
      sortable: true,
      cellTemplate: this.statusTemplate,
      headerTemplate: this.statusHeaderTemplate
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
    columns.push(sizeCol);
    columns.push(uploadMethodCol);
    columns.push(assetsCountCol);
    columns.push(statusCol);
    this.assetsDataTableColumns = columns;
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

    const responseModel: AssetsListResponseModel | any = {};
    const assetResponseModel: AssetResponseModel | any = {};
    const assetProductLinkResponseModel: AssetProductLinksReponseModel | any = {};
    responseModel.data = {
      uploads: [], _pagination: this.page
    };
    assetResponseModel.data = {
      asset: {}
    };
    assetProductLinkResponseModel.data = {
      assetProductLinks: []
    };
    this.productData.assetList.value = responseModel;
    this.productData.asset.value = assetResponseModel;
    this.productData.assetProductLink.value = assetProductLinkResponseModel;
  }

  searchAction(event) {
    this.searchBy = event;
    this.getAssets();
  }

  getStatusCssClass(status: string): string {
    let statusClass = '';
    switch (status) {
      case 'FAILED':
        statusClass = 'badge badge-pill badge-danger bordered';
        break;
      case 'IN_PROGRESS':
        statusClass = 'badge badge-pill badge-warning bordered';
        break;
      case 'COMPLETE':
        statusClass = 'badge badge-pill badge-success bordered';
        break;
      case 'NA':
        statusClass = 'badge badge-pill badge-light bordered';
        break;
      default:
        statusClass = 'badge badge-pill badge-light bordered';
        break;
    }
    return statusClass;
  }

  newAsset() {
    this.uploadEvent.uploadWindowAction.next('show');
  }

  onRowClick(event) {
    this.tabAssetLoader = true;
    if (event.type === 'click') {
      this.selectedRow = event.row;
      this.getTabData(event.row.id);
      this.tableDetailsWindowEvent.tableDetailsWindowAction.next('show');
    }
  }

  showProductAssociation(row) {
    this.getTabData(row.id);
    this.staticTabs.tabs[1].active = true;
    this.tableDetailsWindowEvent.tableDetailsWindowAction.next('show');
  }

  OnContextMenu(menu: { actionCode: string, rows: Array<any> }) {
    this.selectedMenuAction = menu.actionCode;
    if (this.selectedMenuAction === 'edit') {
      const rowEvent = {
        type: 'click', row: menu.rows[0]
      };
      this.onRowClick(rowEvent);
    } else {
      this.assetLinkData.asset = menu.rows[0];
    }
  }
  onCloseWindow(event) {
    setTimeout(() => {
      this.selectedMenuAction = '';
    });
  }
}
