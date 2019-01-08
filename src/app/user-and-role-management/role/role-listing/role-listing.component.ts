import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PaginationModel } from '../../../data/pagination.model';
import { RoleApiService } from '../../role/service/role-api.service';
import { RoleData } from '../../../data/bucket/role.bucket';
import { RoleListAPIResponseModel, RoleModel } from '../../../data/model/role.model';
import { DataTableComponent } from '../../../data-table/data-table.component';
import { Global } from '../../../g';
import { RoleService } from '../../role/service/role.service';
import { ScrollEvent } from '../../../shared/directives/scroll.directive';

let _this;
@Component({
  selector: 'app-role-listing',
  templateUrl: './role-listing.component.html',
  styleUrls: ['./role-listing.component.scss']
})
export class RoleListingComponent implements OnInit {
  readonly httpSuccessStatusCode: number = 200;
  roleTableDataLoading: boolean;
  page: PaginationModel;
  defaultRoleDatatableColumns: Array<{}> = [];
  roleTableSelectedRows = [];
  scroll: boolean;
  actionItems: string[] = [
    'Action Item',
    'Action Item',
    'Action Item'
  ];
  searchBy: string;
  @ViewChild('defaultRoleDatatable') defaultRoleDatatable: DataTableComponent;
  @ViewChild('defaultRoleTableRowExpandOnNameTemplate') defaultRoleTableRowExpandOnNameTemplate: TemplateRef<any>;
  @ViewChild('roleTableStatusTemplate') roleTableStatusTemplate: TemplateRef<any>;
  @ViewChild('roleTableActionsTemplate') roleTableActionsTemplate: TemplateRef<any>;

  constructor(
    public global: Global,
    public roleList: RoleData,
    private router: Router,
    private roleApiService: RoleApiService,
    public roleService: RoleService
  ) { _this = this; }

  ngOnInit() {
    _this.global.sidepanel = false;
    this.roleTableDataLoading = true;
    this.defaultRoleDatatableColumns = this.getRolesDatatableColumns();
    this.roleService.roleListDataLoader = true;
    this.page = {
      isFirst: false,
      isLast: false,
      pageNumber: 0,
      pageSize: (_this.global.config.pageSizes[0]) ? _this.global.config.pageSizes[0] : 0,
      totalPages: 0,
      totalCount: 0
    };
    this.initModel();
    this.getRolelist();
  }

  addNewRole(event: string) {
    this.router.navigate(['/roles/add']);
  }

  searchAction(event: string) {
    const filter =  event;
    this.searchBy = filter;
    this.getRolelist();
  }

  pageAction(pagination: PaginationModel) {
    this.roleList.RoleListData.value.data._pagination = pagination;
    this.getRolelist();
  }

  onSortByAction(event: {
    sorts
    column
    prevValue
    newValue
  }) {

    let sort = '';
    sort += event.column.prop + ',' + event.newValue;
    this.getRolelist(sort);
  }

  getRolelist(sortBy?: string) {
    this.roleApiService.getroles(this.searchBy, sortBy) ;
  }

  onRowSelectAction({ selected }) {
    this.roleTableSelectedRows.splice(0, selected.length);
    this.roleTableSelectedRows.push(...selected);
  }

  private getRolesDatatableColumns() {
    const columns = [];

    const nameCol = {
      name: this.global.language.name,
      lockCol: true,
      sortable: false,
      minWidth: 200
    };
    const descriptionCol = {
      prop: 'description',
      lockCol: false,
      name: this.global.language.description,
      sortable: false,
      minWidth: 250
    };
    const statusCol = {
      name: this.global.language.status,
      lockCol: false,
      cellTemplate: this.roleTableStatusTemplate,
      prop: 'isGlobal',
      sortable: true,
      minWidth: 100
    };

    const typeCol = {
      prop: 'type',
      lockCol: false,
      name: 'Role Type',
      sortable: false,
      cellClass: 'center',
      headerClass: 'center',
    };

    const actionCol = {
      name: this.global.language.actions,
      lockCol: true,
      sortable: false,
      maxWidth: 100,
      cellClass: 'center',
      headerClass: 'center',
      cellTemplate: this.roleTableActionsTemplate,
    };
    columns.push(nameCol);
    columns.push(descriptionCol);
    columns.push(statusCol);
    columns.push(typeCol);
    columns.push(actionCol);
    return columns;
  }

  private initModel() {
    this.roleService.roleListDataLoader = true;
    const responseModel: RoleListAPIResponseModel| any = {};
    responseModel.data = { roles: [], _pagination: this.page };
    this.roleList.RoleListData.value = responseModel;
  }
  public handleScroll(event: ScrollEvent) {
    this.scroll =  event.isTopScrolled;
  }
}
