import { Component, OnInit, TemplateRef, ViewChild, Renderer2 } from '@angular/core';
import { Global } from '../../../g';
import { Util } from '../../../util';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationModel } from '../../../data/pagination.model';
import { UserApiService } from '../service/user-api.service';
import { UserData } from '../../../data/bucket/user.bucket';
import { UserApiResponseModel, UserModel } from '../../../data/model/user.model';
import { DataTableComponent } from '../../../data-table/data-table.component';
import { UserService } from '../service/user.service';
import { ScrollEvent } from '../../../shared/directives/scroll.directive';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserGroupService } from '@services/user-group.service';
import { UserToUserGroupData } from '@repository/bucket/user-to-usergroup.bucket';
let _this;
@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss'],
  providers: [UserGroupService, UserToUserGroupData]
})
export class UserListingComponent implements OnInit {
  userTableDataLoading: boolean;
  userTableSelectedRows = [];
  userDatatableColumns: Array<{}> = [];
  pageSize: number;
  searchBy: string;
  page: PaginationModel;
  rowExpandDetails: any = {};
  rowExapndId: number;
  rowExpandNode: HTMLElement[] = [];
  scroll: boolean;
  rowInfo: Object;
  selectedUser: string;
  @ViewChild('userDatatable') userDatatable: DataTableComponent;
  @ViewChild('userTableRowExpandOnNameTemplate') userTableRowExpandOnNameTemplate: TemplateRef<any>;
  @ViewChild('userTableStatusTemplate') userTableStatusTemplate: TemplateRef<any>;
  @ViewChild('userTableActionsTemplate') userTableActionsTemplate: TemplateRef<any>;
  @ViewChild('rowdetails') rowdetails: TemplateRef<any>;
  userType = false;
  emailAdded = false;
  @ViewChild('multipleUserModal') multipleUserModal: ModalDirective;
  @ViewChild('addNewUser') addNewUser: ModalDirective;
  multipleEmailList: Array<string> = [];
  email: string;
  successfullyInvited = false;
  selectedmenu: string;
  actionItems = [
    { actionCode: 'addtoclassroom', actionName: this.global.language.user_assign_add_to_classroom },
    { actionCode: 'addtoproduct', actionName:  this.global.language.user_assign_add_to_product }
  ];
  constructor(public global: Global,
    public util: Util,
    private router: Router,
    public userList: UserData,
    private userApiService: UserApiService,
    public userService: UserService,
    private render: Renderer2,
    private assignToUserGroup: UserToUserGroupData,
    private userData: UserData) { _this = this; }

  ngOnInit() {
    _this.global.sidepanel = false;
    this.userTableDataLoading = true;
    this.userDatatableColumns = this.getUserDatatableColumns();
    this.userService.userListDataLoader = true;
    this.page = {
      isFirst: false,
      isLast: false,
      pageNumber: 0,
      pageSize: (_this.global.config.pageSizes[0]) ? _this.global.config.pageSizes[0] : 0,
      totalPages: 0,
      totalCount: 0
    };
    this.initModel();
    this.getUserlist();
  }
  searchAction(event: string) {
    const filter = event;
    this.searchBy = filter;
    this.getUserlist();
  }
  pageAction(pagination: PaginationModel) {
    this.userList.UserListData.value.data._pagination = pagination;
    this.getUserlist();
  }
  onSortByAction(event: {
    sorts
    column
    prevValue
    newValue
  }) {
    const sort = event.column.prop + ',' + event.newValue;
    this.getUserlist(sort);
  }
  getUserlist(sortBy?: string) {
    this.userApiService.getUsers(this.searchBy, sortBy);
  }
  onRowSelectAction({ selected }) {
    this.userTableSelectedRows.splice(0, selected.length);
    this.userTableSelectedRows.push(...selected);
  }
  userDetails($event, row) {
    this.removeExpandedClass();
    this.userDatatable.impDatatable.rowDetail.collapseAllRows();
    const findParentNode = this.findParentNode('DATATABLE-BODY-ROW', $event.target);
    if (this.rowExapndId !== row.id) {
      this.rowExpandNode.push(findParentNode);
      this.render.addClass(findParentNode, 'row-expanded');
      this.userDatatable.impDatatable.rowDetail.toggleExpandRow(row);
      this.rowExapndId = row.id;
    } else {
      this.render.removeClass(findParentNode, 'row-expanded');
      this.rowExapndId = 0;
    }
    this.rowInfo = row;
  }

  private getUserDatatableColumns() {
    const columns = [];
    const nameCol = {
      name: this.global.language.name,
      prop: 'firstName',
      expanded: 'expanded',
      lockCol: true,
      minWidth: 200,
      sortable: true
    };
    const emailCol = {
      name: this.global.language.email,
      prop: 'email',
      lockCol: false,
      minWidth: 200,
      expanded: 'expanded',
      sortable: true
    };
    const roleCol = {
      name: this.global.language.role,
      prop: 'type',
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
      cellTemplate: this.userTableStatusTemplate,
    };
    const actionCol = {
      name: this.global.language.actions,
      lockCol: true,
      sortable: false,
      minWidth: 100,
      cellClass: 'center',
      headerClass: 'center',
      cellTemplate: this.userTableActionsTemplate,
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
    columns.push(emailCol);
    columns.push(roleCol);
    columns.push(statusCol);
    columns.push(actionCol);
    return columns;
  }
  private initModel() {
    this.userService.userListDataLoader = true;
    const responseModel: UserApiResponseModel | any = {};
    responseModel.data = { users: [], _pagination: this.page };
    this.userList.UserListData.value = responseModel;
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


  individualUser(event: string) {
    this.router.navigate(['/roles/users/add']);
    this.userType = true;
  }

  showMultipleUser(event: string) {
    this.selectedUser = event;
    this.userType = true;
  }

  checkUserType() {
    if (this.selectedUser === 'multiple') {
      this.addNewUser.hide();
      this.multipleUserModal.show();
    } else {
      this.router.navigate(['/roles/users/add']);
    }
  }

  userInvited() {
    if (this.multipleEmailList.length) {
      this.successfullyInvited = true;
      this.selectedUser = '';
    }
  }

  addMultipleEmail(event: KeyboardEvent) {
    if (event.keyCode === 32 || event.keyCode === 13 || event.keyCode === 44) {
      this.multipleEmailList.push(this.email);
      this.email = '';
      this.emailAdded = true;
    }
  }

  deleteEmail(index: number) {
    this.multipleEmailList.splice(index, 1);
  }

  switchActionItems(row, choice) {
    this.selectedmenu = choice.actionCode;
    this.assignToUserGroup.selectedUser = row;
  }
  onClose(event) {
    this.selectedmenu = '';
  }
}
