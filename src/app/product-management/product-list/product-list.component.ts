import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { Global } from '../../g';
import { ProductApiService } from '../service/product-api.service';
import { DataTableComponent } from '../../data-table/data-table.component';
import { PaginationModel } from '../../data/pagination.model';
import { ProductService } from '../service/product.service';
import { ProductListApiResponseModel, ProductModel } from '../../data/model/product.model';
import { ProductData } from '../../data/bucket/product.bucket';
import { ScrollEvent } from '../../shared/directives/scroll.directive';
import { TableDetailsWindowEventService } from '../../shared/service/table-details-window-event.service';
import { AssetsApiEventService } from '../service/assets-api-event.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductApiService, ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy {
  productTableDataLoading: boolean;
  productTableSelectedRows = [];
  productDatatableColumns: Array<{}> = [];
  productTypeList: Array<{}> = [
    { 'type': 'Course' },
    { 'type': 'Curriculum' }
  ];
  pageSize: number;
  searchBy: string;
  page: PaginationModel;
  rowExpandDetails: any = {};
  rowExapndId: number;
  rowExpandNode: HTMLElement[] = [];
  scroll: boolean;
  rowInfo: Object;
  selectedRow: ProductModel;
  apiEventSubscription: Subscription;
  @ViewChild('productDatatable') productDatatable: DataTableComponent;
  @ViewChild('productTableRowExpandOnNameTemplate') productTableRowExpandOnNameTemplate: TemplateRef<any>;
  @ViewChild('productTableStatusTemplate') productTableStatusTemplate: TemplateRef<any>;
  @ViewChild('productTableActionsTemplate') productTableActionsTemplate: TemplateRef<any>;
  @ViewChild('rowdetails') rowdetails: TemplateRef<any>;
  @ViewChild('productListTimestampTemplate') productListTimestampTemplate: TemplateRef<any>;
  @ViewChild('productListProductCodeTemplate') productListProductCodeTemplate: TemplateRef<any>;
  @ViewChild('productListNameTemplate') productListNameTemplate: TemplateRef<any>;
  @ViewChild('productListFormatTemplate') productListFormatTemplate: TemplateRef<any>;
  @ViewChild('productListStatusTemplate') productListStatusTemplate: TemplateRef<any>;
  @ViewChild('productListActionTemplate') productListActionTemplate: TemplateRef<any>;
  @ViewChild('productListSizeTemplate') productListSizeTemplate: TemplateRef<any>;
  @ViewChild('createNewProduct') createNewProduct: ModalDirective;
  constructor(
    public global: Global,
    private router: Router,
    public productList: ProductData,
    private productApiService: ProductApiService,
    private tableDetailsWindowService: TableDetailsWindowEventService,
    private assetsApiEventService: AssetsApiEventService,
    private productData: ProductData) { }

  ngOnInit() {
    this.productTableDataLoading = true;
    this.productDatatableColumns = this.getProductDatatableColumns();
    this.initModel();
    this.getProductlist();
    this.apiEventSubscription = this.productApiService.apiEvent.subscribe((event) => this.handledApiEvent(event));
  }
  ngOnDestroy() {
    this.apiEventSubscription.unsubscribe();
  }
  addNewProduct(event: string) {
    this.createNewProduct.show();
  }
  searchAction(event: string) {
    const filter = event;
    this.searchBy = filter;
    this.getProductlist();
  }
  pageAction(pagination: PaginationModel) {
    this.productList.ProductListData.value.data._pagination = pagination;
    this.getProductlist();
  }
  onSortByAction(event: {
    sorts
    column
    prevValue
    newValue
  }) {
    const sort = event.column.prop + ',' + event.newValue;
    this.getProductlist(sort);
  }

  getProductlist(sortBy?: string) {
    this.productTableDataLoading = true;
    this.productApiService.getproducts(this.searchBy, sortBy);
  }

  onRowSelectAction({ selected }) {
    this.productTableSelectedRows.splice(0, selected.length);
    this.productTableSelectedRows.push(...selected);
  }

  private handledApiEvent(event) {
    switch (event) {
      case 'product_list_received':
        this.productTableDataLoading = false;
        break;
    }
  }

  private getProductDatatableColumns() {
    const columns = [];
    const nameCol = {
      name: this.global.language.name,
      prop: 'name',
      expanded: 'expanded',
      lockCol: true,
      minWidth: 150,
      cellTemplate: this.productTableRowExpandOnNameTemplate,
      sortable: true
    };
    const sizeCol = {
      name: this.global.language.size,
      prop: 'size',
      expanded: 'expanded',
      lockCol: true,
      minWidth: 70,
      cellTemplate: this.productListSizeTemplate,
      sortable: true
    };
    const codeCol = {
      prop: 'code',
      lockCol: false,
      minWidth: 100,
      name: this.global.language.product_code,
      cellTemplate: this.productListProductCodeTemplate,
      sortable: false
    };
    const formatCol = {
      prop: 'format',
      lockCol: false,
      minWidth: 100,
      name: this.global.language.format,
      cellTemplate: this.productListFormatTemplate,
      sortable: false
    };
    const timeStampCol = {
      prop: 'createdTime',
      cellTemplate: this.productListTimestampTemplate,
      lockCol: false,
      minWidth: 150,
      name: this.global.language.timestamp,
      sortable: false
    };
    const statusCol = {
      name: this.global.language.status,
      prop: 'isActive',
      lockCol: false,
      sortable: false,
      minWidth: 100,
      cellClass: 'center',
      headerClass: 'center',
      cellTemplate: this.productTableStatusTemplate,
    };
    const actionCol = {
      name: this.global.language.actions,
      lockCol: true,
      sortable: false,
      minWidth: 100,
      cellClass: 'center',
      headerClass: 'center',
      cellTemplate: this.productTableActionsTemplate,
    };
    columns.push(timeStampCol);
    columns.push(codeCol);
    columns.push(nameCol);
    columns.push(sizeCol);
    columns.push(formatCol);
    columns.push(statusCol);
    columns.push(actionCol);
    return columns;
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
    const responseModel: ProductListApiResponseModel | any = {};
    responseModel.data = {
      products: [], _pagination: this.page
    };
    this.productList.ProductListData.value = responseModel;
  }

  public handleScroll(event: ScrollEvent) {
    this.scroll = event.isTopScrolled;
  }

  productInfoData(row) {
    this.selectedRow = row;
    this.tableDetailsWindowService.tableDetailsWindowAction.next('show');
  }

  selectProductType(type: string) {
    switch (type) {
      case 'Course': this.router.navigate(['/products/course/create']);
        break;
      case 'Curriculum': this.router.navigate(['/products/curriculum/create']);
        break;
    }
  }
}
