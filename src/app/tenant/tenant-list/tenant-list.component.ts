import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DataTableComponent } from '@datatable/data-table.component';
import { Global } from 'app/g';
import { PaginationModel } from '@repository/pagination.model';
import { TenantData } from '@repository/bucket/tenant.bucket';
import { ScrollEvent } from '@shared/directives/scroll.directive';
import { TenantApiResponseModel, TenantModel } from '@repository/model/tenant.model';
import { TenantApiService } from '@tenants/service/tenant-api.service';
import { TenantService } from '@tenants/service/tenant.service';
import { AccessModel } from '@repository/model/access.model';
import { AccessNameService } from '@services/access-name.service';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit, OnDestroy {
  sort: any;
  tenantTableDataLoading: boolean;
  tenantTableSelectedRows = [];
  tenantDatatableColumns: Array<{}> = [];
  pageSize: number;
  searchBy: string;
  page: PaginationModel;
  rowExpandDetails: any = {};
  rowExapndId: number;
  rowExpandNode: HTMLElement[] = [];
  scroll: boolean;
  tenentCreationAccess: AccessModel;
  apiSubscription: Subscription;
  tenants: Array<TenantModel>;
  pagination: PaginationModel;
  actionItems: string[] = [
    this.global.language.activeInactive,
    this.global.language.edit,
    this.global.language.details,
  ];
  @ViewChild('tenantDatatable') tenantDatatable: DataTableComponent;
  @ViewChild('tenantTableRowExpandOnNameTemplate') tenantTableRowExpandOnNameTemplate: TemplateRef<any>;
  @ViewChild('tenantTableStatusTemplate') tenantTableStatusTemplate: TemplateRef<any>;
  @ViewChild('tenantTableActionsTemplate') tenantTableActionsTemplate: TemplateRef<any>;
  @ViewChild('rowdetails') rowdetails: TemplateRef<any>;
  @ViewChild('tenantTableTenantNameColumnTemplate') tenantTableTenantNameColumnTemplate: TemplateRef<any>;
  @ViewChild('tenantTablePrimaryContactColumnTemplate') tenantTablePrimaryContactColumnTemplate: TemplateRef<any>;
  @ViewChild('tenantTableEmailColumnTemplate') tenantTableEmailColumnTemplate: TemplateRef<any>;
  @ViewChild('tenantTableAssetsColumnTemplate') tenantTableAssetsColumnTemplate: TemplateRef<any>;
  @ViewChild('tenantTableStatusColumnTemplate') tenantTableStatusColumnTemplate: TemplateRef<any>;
  @ViewChild('tenantTableActionColumnTemplate') tenantTableActionColumnTemplate: TemplateRef<any>;
  @ViewChild('tenantTablePrimaryContactCellTemplate') tenantTablePrimaryContactCellTemplate: TemplateRef<any>;
  @ViewChild('tenantTableAssetsCellTemplate') tenantTableAssetsCellTemplate: TemplateRef<any>;
  @ViewChild('tenantTableEmailCellTemplate') tenantTableEmailCellTemplate: TemplateRef<any>;

  constructor(
    public tenantData: TenantData,
    public global: Global,
    private router: Router,
    private render: Renderer2,
    private tenantApiService: TenantApiService,
    public tenantService: TenantService,

  ) { }
  ngOnInit() {
    this.tenantTableDataLoading = false;
    this.tenantDatatableColumns = this.getTenantsDatatableColumns();
    this.tenantData.pagination.pageSize = this.global.config['pageSizes'][0] || 0;
    this.pagination = this.tenantData.pagination;
    this.initModel();
    this.getTenantList();
    this.apiSubscription = this.tenantApiService.tenantApiEvent.subscribe((event) => this.handleEvent(event));
  }

  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
  }

  private handleEvent(event: string): void {
    switch (event) {
      case 'tenant_list_received':
        this.tenants = this.tenantData.tenants;
        this.pagination = this.tenantData.pagination;
        this.tenantTableDataLoading = false;
        break;
      case 'tenant_list_received_error':
        this.tenantTableDataLoading = false;
        break;
    }
  }
  private initModel() {
    this.tenentCreationAccess = AccessNameService.tenantCreationAccess;
    const responseModel: TenantApiResponseModel | any = {};
    responseModel.data = { tenants: [], _pagination: this.page };
  }

  private getTenantsDatatableColumns() {
    const columns = [];
    const tenantCol = {
      prop: 'company',
      lockCol: true,
      name: this.global.language.tenant,
      cellTemplate: this.tenantTableRowExpandOnNameTemplate,
      headerTemplate: this.tenantTableTenantNameColumnTemplate,
      sortable: false,
      minWidth: 200
    };
    const primaryContactCol = {
      prop: 'name',
      lockCol: true,
      name: this.global.language.primaryContact,
      expanded: 'expanded',
      sortable: true,
      minWidth: 200,
      cellTemplate: this.tenantTablePrimaryContactCellTemplate,
      headerTemplate: this.tenantTablePrimaryContactColumnTemplate
    };
    const contactEmaileCol = {
      prop: 'contactEmail',
      lockCol: false,
      name: this.global.language.email,
      sortable: false,
      minWidth: 200,
      headerTemplate: this.tenantTableEmailColumnTemplate,
      cellTemplate: this.tenantTableEmailCellTemplate
    };
    const assetsCol = {
      prop: 'asset',
      lockCol: false,
      name: this.global.language.assets,
      sortable: false,
      minWidth: 100,
      headerTemplate: this.tenantTableAssetsColumnTemplate,
      cellTemplate: this.tenantTableAssetsCellTemplate
    };
    const statusCol = {
      name: this.global.language.status,
      lockCol: false,
      prop: 'isActive',
      sortable: false,
      cellTemplate: this.tenantTableStatusTemplate,
      cellClass: 'center',
      headerClass: 'center',
      minWidth: 100,
      headerTemplate: this.tenantTableStatusColumnTemplate
    };
    const actionCol = {
      name: this.global.language.actions,
      lockCol: true,
      sortable: false,
      minWidth: 80,
      maxWidth: 80,
      cellClass: 'center',
      headerClass: 'center',
      cellTemplate: this.tenantTableActionsTemplate,
      headerTemplate: this.tenantTableActionColumnTemplate
    };
    columns.push(tenantCol);
    columns.push(primaryContactCol);
    columns.push(contactEmaileCol);
    columns.push(assetsCol);
    columns.push(statusCol);
    columns.push(actionCol);
    return columns;
  }

  private findParentNode(parentName, childObj) {
    let tempNodeObj = childObj.parentNode;
    while (tempNodeObj.tagName !== parentName) {
      tempNodeObj = tempNodeObj.parentNode;
    }
    return tempNodeObj;
  }

  private removeExpandedClass() {
    if (this.rowExpandNode) {
      this.rowExpandNode.forEach(element => {
        this.render.removeClass(element, 'row-expanded');
      });
    }
  }

  addNewTenant(event) {
    this.router.navigate(['/tenants/add']);
  }
  searchAction(event: string) {
    const filter = event;
    this.searchBy = filter;
    this.getTenantList();
  }
  pageAction(pagination: PaginationModel) {
    this.tenantData.pagination = this.pagination = pagination;
    this.getTenantList();
  }
  getTenantList() {
    this.tenantTableDataLoading = true;
    this.tenantApiService.getTenantList(this.searchBy, this.sort);
  }
  onSortByAction(event: {
    sorts
    column
    prevValue
    newValue
  }) {
    this.sort = event.column.prop + ',' + event.newValue;
    this.getTenantList();
  }
  onRowSelectAction({ selected }) {
    this.tenantTableSelectedRows.splice(0, selected.length);
    this.tenantTableSelectedRows.push(...selected);
  }
  tenantDetails($event, row) {
    this.rowExpandDetails = {};
    this.removeExpandedClass();
    this.tenantDatatable.impDatatable.rowDetail.collapseAllRows();
    const findParentNode = this.findParentNode('DATATABLE-BODY-ROW', $event.target);
    if (this.rowExapndId !== row.id) {
      this.rowExpandNode.push(findParentNode);
      this.render.addClass(findParentNode, 'row-expanded');
      this.tenantDatatable.impDatatable.rowDetail.toggleExpandRow(row);
      this.rowExapndId = row.id;
      if (row.contacts && row.contacts[0]) {
        this.rowExpandDetails = row.contacts[0];
      }
    } else {
      this.render.removeClass(findParentNode, 'row-expanded');
      this.rowExapndId = 0;
    }
  }

  handleScroll(event: ScrollEvent) {
    this.scroll = event.isTopScrolled;
  }
}
