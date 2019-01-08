import { Component, OnInit, Output, Input, EventEmitter, TemplateRef, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from './../../../g';
import { SiteData } from '../../../data/bucket/site.bucket';
import { SiteModel, SiteApiResponseModel } from '../../../data/model/site.model';
import { InstitutionService } from '../../institution-management/service/institution.service';
import { InstitutionApiService } from '../../institution-management/service/institution-api.service';
import { InstitutionApiResponseModel, InstitutionModel } from '../../../data/model/institution.model';
import { InstitutionData } from '../../../data/bucket/institution.bucket';
import { PaginationModel } from '../../../data/pagination.model';
import { DataTableComponent } from '../../../data-table/data-table.component';
import { ScrollEvent } from '../../../shared/directives/scroll.directive';
import { SiteApiService } from '../../service/site-api.service';

let _this;
@Component({
  selector: 'app-institution-listing',
  templateUrl: './institution-listing.component.html',
  styleUrls: ['./institution-listing.component.scss']
})
export class InstitutionListingComponent implements OnInit {
  institutionTableDataLoading: boolean;
  institutionTableSelectedRows = [];
  institutionDatatableColumns: Array<{}> = [];
  pageSize: number;
  searchBy: string;
  page: PaginationModel;
  rowExpandDetails: any = {};
  rowExapndId: number;
  rowExpandNode: HTMLElement[] = [];
  scroll: boolean;
  rowInfo: Object;
  siteId: number;
  siteListItems: Array<any> = [];
  siteName: string;
  @ViewChild('institutionDatatable') institutionDatatable: DataTableComponent;
  @ViewChild('institutionTableRowExpandOnNameTemplate') institutionTableRowExpandOnNameTemplate: TemplateRef<any>;
  @ViewChild('institutionTableStatusTemplate') institutionTableStatusTemplate: TemplateRef<any>;
  @ViewChild('institutionTableActionsTemplate') institutionTableActionsTemplate: TemplateRef<any>;
  @ViewChild('rowdetails') rowdetails: TemplateRef<any>;
  constructor(private router: Router,
    public global: Global,
    public siteData: SiteData,
    private route: ActivatedRoute,
    public institutionList: InstitutionData,
    private institutionApiService: InstitutionApiService,
    private siteSerive: SiteApiService,
    public institutionService: InstitutionService,
    private render: Renderer2
  ) { _this = this; }

  ngOnInit() {
    this.institutionTableDataLoading = true;
    this.institutionDatatableColumns = this.getInstitutionDatatableColumns();
    this.institutionService.institutionListDataLoader = true;
    this.page = {
      isFirst: false,
      isLast: false,
      pageNumber: 0,
      pageSize: (this.global.config['pageSizes[0]']) ? this.global.config['pageSizes[0]'] : 0,
      totalPages: 0,
      totalCount: 0
    };
    this.initModel();
    this.route.params.subscribe(params => {
      this.siteId = +params['siteId'];
    });
    this.getInstitutionlist();
    this.getSiteList();
   }

  addNewInstitution(event: string) {
    this.router.navigate(['/sites', this.siteId, 'institutions', 'add']);
  }

  onSelectedSiteNameClick(event: Object) {
    this.siteName = event['name'];
    this.router.navigate(['/sites', event['id'], 'institutions']);
  }

  searchAction(event: string) {
    const filter = event;
    this.searchBy = filter;
    this.getInstitutionlist();
  }

  pageAction(pagination: PaginationModel) {
    this.institutionList.InstitutionListData.value.data._pagination = pagination;
    this.getInstitutionlist();
  }

  onSortByAction(event: {
    sorts
    column
    prevValue
    newValue
  }) {
    const sort = event.column.prop + ',' + event.newValue;
    this.getInstitutionlist(sort);
  }

  onRowSelectAction({ selected }) {
    this.institutionTableSelectedRows.splice(0, selected.length);
    this.institutionTableSelectedRows.push(...selected);
  }

  private getInstitutionDatatableColumns() {
    const columns = [];
    const nameCol = {
      name: this.global.language.institute,
      prop: 'name',
      expanded: 'expanded',
      lockCol: true,
      minWidth: 200,
      cellTemplate: this.institutionTableRowExpandOnNameTemplate,
      sortable: true
    };
    const contactCol = {
      name: this.global.language.primaryContact,
      prop: 'contacts',
      lockCol: true,
      minWidth: 200,
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
    };
    const actionCol = {
      name: this.global.language.actions,
      lockCol: true,
      sortable: false,
      minWidth: 100,
      cellClass: 'center',
      headerClass: 'center',
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
    columns.push(nameCol);
    columns.push(contactCol);
    columns.push(statusCol);
    columns.push(actionCol);
    return columns;
  }

  private initModel() {
    this.institutionService.institutionListDataLoader = true;
    const responseModel: InstitutionApiResponseModel | any = {};
    responseModel.data = { institutions: [], _pagination: this.page };
    this.institutionList.InstitutionListData.value = responseModel;
   }
  private getSiteList() {
    if (!this.siteData.SiteListData.value) {
      const siteResponseModel: SiteApiResponseModel | any = {};
      siteResponseModel.data = { sites: [], _pagination: this.page };
      this.siteData.SiteListData.value = siteResponseModel;
      this.siteData.SiteListData.value.data._pagination.pageNumber = 0;
      this.siteData.SiteListData.value.data._pagination.pageSize = 500;
      this.siteSerive.getsites();
    }

  }
  getInstitutionlist(sortBy?: string) {
    this.institutionApiService.getinstitutions(this.siteId, this.searchBy, sortBy);
  }

  institutionDetails($event, row) {
    this.removeExpandedClass();
    this.institutionDatatable.impDatatable.rowDetail.collapseAllRows();
    const findParentNode = this.findParentNode('DATATABLE-BODY-ROW', $event.target);
    if (this.rowExapndId !== row.id) {
      this.rowExpandNode.push(findParentNode);
      this.render.addClass(findParentNode, 'row-expanded');
      this.institutionDatatable.impDatatable.rowDetail.toggleExpandRow(row);
      this.rowExapndId = row.id;
    } else {
      this.render.removeClass(findParentNode, 'row-expanded');
      this.rowExapndId = 0;
    }
    this.rowInfo = row;
  }

  private removeExpandedClass() {
    if (this.rowExpandNode) {
      this.rowExpandNode.forEach(element => {
        this.render.removeClass(element, 'row-expanded');
      });
    }
  }
  private findParentNode(parentName, childObj) {
    let tempNodeObj = childObj.parentNode;
    while (tempNodeObj.tagName !== parentName) {
      tempNodeObj = tempNodeObj.parentNode;
    }
    return tempNodeObj;
  }
}
