import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Renderer2
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteApiService } from '../service/site-api.service';
import { DataTableComponent } from '../../data-table/data-table.component';
import { Global } from '../../g';
import { PaginationModel } from '../../data/pagination.model';
import { SiteService } from '../service/site.service';
import { SiteApiResponseModel, SiteModel } from '../../data/model/site.model';
import { SiteData } from '../../data/bucket/site.bucket';
import { ScrollEvent } from '../../shared/directives/scroll.directive';

let _this;
@Component({
  selector: 'app-site-listing',
  templateUrl: './site-listing.component.html',
  styleUrls: ['./site-listing.component.scss']
})

export class SiteListingComponent implements OnInit {
  siteTableDataLoading: boolean;
  siteTableSelectedRows = [];
  siteDatatableColumns: Array<{}> = [];
  pageSize: number;
  searchBy: string;
  page: PaginationModel;
  rowExpandDetails: any = {};
  rowExapndId: number;
  rowExpandNode: HTMLElement[] = [];
  scroll: boolean;
  rowInfo: Object;
  @ViewChild('siteDatatable') siteDatatable: DataTableComponent;
  @ViewChild('siteTableRowExpandOnNameTemplate') siteTableRowExpandOnNameTemplate: TemplateRef<any>;
  @ViewChild('siteTableStatusTemplate') siteTableStatusTemplate: TemplateRef<any>;
  @ViewChild('siteTableActionsTemplate') siteTableActionsTemplate: TemplateRef<any>;
  @ViewChild('rowdetails') rowdetails: TemplateRef<any>;
  constructor(
    public global: Global,
    private router: Router,
    public siteList: SiteData,
    private siteApiService: SiteApiService,
    public siteService: SiteService,
    private render: Renderer2,
    private siteData: SiteData
  ) { _this = this; }
  actionItems: string[] = [
    this.global.language.manageInstitutions,
    this.global.language.manageProducts,
    this.global.language.visitSite,
    this.global.language.manageSiteAdminsUsers,
    this.global.language.editSiteInfoSettings,
    this.global.language.changeSiteStatus,
    this.global.language.deactivateDelete
  ];
  ngOnInit() {
    _this.global.sidepanel = false;
    this.siteTableDataLoading = true;
    this.siteDatatableColumns = _this.getSiteDatatableColumns();
    this.siteService.siteListDataLoader = true;
    this.page = {
      isFirst: false,
      isLast: false,
      pageNumber: 0,
      pageSize: (_this.global.config.pageSizes[0]) ? _this.global.config.pageSizes[0] : 0,
      totalPages: 0,
      totalCount: 0
    };
    this.initModel();
    this.getSitelist();
  }
  addNewSite(event: string) {
    this.router.navigate(['/sites/add']);
  }
  searchAction(event: string) {
    const filter = event;
    this.searchBy = filter;
    this.getSitelist();
  }
  pageAction(pagination: PaginationModel) {
    this.siteList.SiteListData.value.data._pagination = pagination;
    this.getSitelist();
  }
  onSortByAction(event: {
    sorts
    column
    prevValue
    newValue
  }) {
    const sort = event.column.prop + ',' + event.newValue;
    this.getSitelist(sort);
  }
  getSitelist(sortBy?: string) {
    this.siteApiService.getsites(this.searchBy, sortBy);
  }
  onRowSelectAction({ selected }) {
    this.siteTableSelectedRows.splice(0, selected.length);
    this.siteTableSelectedRows.push(...selected);
  }
  siteDetails($event, row) {
    this.removeExpandedClass();
    this.siteDatatable.impDatatable.rowDetail.collapseAllRows();
    const findParentNode = this.findParentNode('DATATABLE-BODY-ROW', $event.target);
    if (this.rowExapndId !== row.id) {
      this.rowExpandNode.push(findParentNode);
      this.render.addClass(findParentNode, 'row-expanded');
      this.siteDatatable.impDatatable.rowDetail.toggleExpandRow(row);
      this.rowExapndId = row.id;
    } else {
      this.render.removeClass(findParentNode, 'row-expanded');
      this.rowExapndId = 0;
    }
    this.rowInfo = row;
  }

  private getSiteDatatableColumns() {
    const columns = [];
    const nameCol = {
      name: this.global.language.name,
      expanded: 'expanded',
      lockCol: true,
      minWidth: 200,
      cellTemplate: this.siteTableRowExpandOnNameTemplate,
      sortable: true
    };
    const codeCol = {
      prop: 'code',
      lockCol: false,
      minWidth: 200,
      name: this.global.language.description,
      sortable: false
    };
    const urlCol = {
      name: this.global.language.url,
      prop: 'url',
      lockCol: false,
      minWidth: 200,
      expanded: 'expanded',
      sortable: true
    };
    const statusCol = {
      name: this.global.language.status,
      prop: 'isActive',
      lockCol: false,
      sortable: false,
      minWidth: 100,
      cellClass: 'center',
      headerClass: 'center',
      cellTemplate: this.siteTableStatusTemplate,
    };
    const actionCol = {
      name: this.global.language.actions,
      lockCol: true,
      sortable: false,
      minWidth: 100,
      cellClass: 'center',
      headerClass: 'center',
      cellTemplate: this.siteTableActionsTemplate,
    };
    columns.push(nameCol);
    columns.push(codeCol);
    columns.push(urlCol);
    columns.push(statusCol);
    columns.push(actionCol);
    return columns;
  }
  private initModel() {
    this.siteService.siteListDataLoader = true;
    const responseModel: SiteApiResponseModel | any = {};
    responseModel.data = { sites: [], _pagination: this.page };
    this.siteList.SiteListData.value = responseModel;
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
  public handleScroll(event: ScrollEvent) {
    this.scroll = event.isTopScrolled;
  }

  switchActionItems(row: Object, choice?: string) {
    switch (choice) {
      case this.global.language.manageInstitutions: this.createNewInstitution(row);
        break;
    }
  }
  createNewInstitution(row) {
    this.router.navigate(['/sites', row.id, 'institutions']);
  }
  createNewInstitute() {
    this.router.navigate(['/sites', this.rowInfo['id'], 'institutions']);
  }
}
