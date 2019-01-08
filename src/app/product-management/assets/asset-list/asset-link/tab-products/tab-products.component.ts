import { Component, ViewChild, EventEmitter, OnInit, OnDestroy, Output, TemplateRef } from '@angular/core';
import { Global } from 'app/g';
import { ProductListApiResponseModel, ProductModel, ProductTypeModel } from '@repository/model/product.model';
import { AssetsPostModel } from '@repository/model/upload.model';
import { AssetProductLinksReponseModel } from '@repository/model/asset.model';
import { ProductData } from '@repository/bucket/product.bucket';
import { PaginationModel } from '@repository/pagination.model';
import { ProductApiService } from '@products/service/product-api.service';
import { Subscription } from 'rxjs/Subscription';
import { ProductTypeApiService } from '@products/service/product-type-api.service';
import { ProductTypeData } from '@repository/bucket/product-type.bucket';
import { FilterModel } from '@repository/model/application.model';
import { AssetLinkData } from '@repository/bucket/asset-link.bucket';
import { AssetLinkApiService } from '@products/service/asset-link-api.service';


@Component({
  selector: 'app-asset-link-tab-products',
  templateUrl: './tab-products.component.html',
  styleUrls: ['./tab-products.component.scss']
})
export class TabProductsComponent implements OnInit, OnDestroy {
  selectedRows = [];
  page: PaginationModel;
  dataLoader = false;
  assetsDataTableColumns: Array<{}> = [];
  productApiEventSubscription: Subscription;
  productTypeApiEventSubscription: Subscription;
  products: Array<ProductModel>;
  pagination: PaginationModel;
  @Output() onButtonAction = new EventEmitter<any>();
  searchQuery: string;
  sort: any;
  productTypes: Array<ProductTypeModel>;
  tableFilter: FilterModel;
  @ViewChild('productFormatHeaderTemplate') productFormatHeaderTemplate: TemplateRef<any>;
  constructor(
    public global: Global,
    private productData: ProductData,
    private productApi: ProductApiService,
    private productTypeApi: ProductTypeApiService,
    private productTypeData: ProductTypeData,
    private assetLinkData: AssetLinkData,
    private assetLinkApi: AssetLinkApiService
  ) { }

  ngOnInit() {
    this.tableFilter = { isActive: true };
    this.initModel();
    this.productTableColumns();
    this.productApiEventSubscription = this.productApi.apiEvent.subscribe((event) => this.handleProductApiEvent(event));
    this.productTypeApiEventSubscription = this.productTypeApi.apiEvent.subscribe((event) => this.handleProductTypeApiEvent(event));
  }

  ngOnDestroy() {
    this.productApiEventSubscription.unsubscribe();
    this.productTypeApiEventSubscription.unsubscribe();
  }

  private handleProductTypeApiEvent(event: string) {
    switch (event) {
      case 'product_types_list_received':
        this.productTypes = this.productTypeData.productTypes;
        break;
    }
  }

  private handleProductApiEvent(event: string) {
    switch (event) {
      case 'product_list_received':
        this.dataLoader = false;
        this.products = this.productData.ProductListData.value.data.products;
        this.pagination = this.productData.ProductListData.value.data._pagination;
        break;
    }
  }


  private initModel() {
    this.pagination = {
      isFirst: false,
      isLast: false,
      pageNumber: 0,
      pageSize: (this.global.config['pageSizes'][0]) ? this.global.config['pageSizes'][0] : 0,
      totalPages: 0,
      totalCount: 0
    };
    const responseModel: ProductListApiResponseModel | any = {};
    responseModel.data = {
      uploads: [], _pagination: this.pagination
    };
    this.productData.ProductListData.value = responseModel;
    this.getProductTypes();
    this.getProducts();

  }

  private productTableColumns() {
    const columns = [];
    const productCodeCol = {
      prop: 'code',
      lockCol: true,
      name: this.global.language.product_code,
      sortable: true
    };
    const productTitleCol = {
      prop: 'name',
      lockCol: true,
      name: this.global.language.name,
      sortable: false
    };
    const productFormatCol = {
      prop: 'productType',
      propRel: 'productTypeId',
      lockCol: true,
      name: this.global.language.format,
      sortable: false,
      headerTemplate: this.productFormatHeaderTemplate
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
    columns.push(productCodeCol);
    columns.push(productTitleCol);
    columns.push(productFormatCol);
    this.assetsDataTableColumns = columns;
  }

  getProducts() {
    this.dataLoader = true;
    this.productApi.getproducts(this.searchQuery, this.sort, this.tableFilter);
  }

  getProductTypes() {
    this.productTypeApi.getProductTypes('', '', this.tableFilter);
  }

  onNext() {
    this.assetLinkData.products = this.selectedRows;
    this.assetLinkApi.apiEvent.next('asset_link_selected_products_update');
    this.onButtonAction.emit('show_asset_link');
  }

  onSelected() {
    if (this.selectedRows.length <= 0) {
      this.onButtonAction.emit('disable_asset_link');
    }
  }
  searchBy(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.getProducts();
  }

  onSortByAction(event: {
    sorts
    column
    prevValue
    newValue
  }) {
    this.sort = event.column.prop + ',' + event.newValue;
    this.getProducts();
  }

  onTableFilter(key: string, value: any) {
    this.tableFilter[key] = value;
    this.getProducts();
  }

  valueExists(arr: Array<FilterModel>, keyValue: string) {
    return arr.findIndex(x => x.key === keyValue);
  }

  getClass(key: string, value: any) {
    return this.tableFilter[key] && this.tableFilter[key] === value ? true : false;
  }

  pageAction(pagination: PaginationModel) {
    this.productData.assetList.value.data._pagination = pagination;
    this.getProducts();
  }

  cancel() {
    this.assetLinkApi.apiEvent.next('close_modal');
  }
}
