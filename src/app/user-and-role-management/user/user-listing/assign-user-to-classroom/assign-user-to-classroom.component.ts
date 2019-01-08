import { Component, EventEmitter, Output, OnInit, Input, OnDestroy } from '@angular/core';
import { Global } from 'app/g';
import { UserGroupService } from '@services/user-group.service';
import { UserGroupModel } from '@repository/model/user-group.model';
import { PaginationModel } from '@repository/pagination.model';
import { UserToUserGroupData } from '@repository/bucket/user-to-usergroup.bucket';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-user-to-classroom',
  templateUrl: './assign-user-to-classroom.component.html',
  styleUrls: ['./assign-user-to-classroom.component.scss']
})
export class AssignUserToClassroomComponent implements OnInit, OnDestroy {
  private _show;
  @Input()
  set show(v: boolean) {
    this.selectedRows = [];
    this._show = v;
  }
  get show() {
    return this._show;
  }
  selectedRows = [];
  userGroups: Array<UserGroupModel> = [];
  pagination: PaginationModel;
  dataloader: boolean;
  dataTableColumns: Array<{}>;
  apiSubscription: Subscription;
  @Output() onClose = new EventEmitter<any>();
  constructor(public global: Global,
    private assignUserGroup: UserToUserGroupData,
    private userGroupApi: UserGroupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDataTableColumns();
    this.dataloader = false;
    this.pagination = this.assignUserGroup.pagination;
    this.getUserGroups();
    this.apiSubscription = this.userGroupApi.apiEvent.subscribe((event) => this.handleApiEevnt(event));
  }

  ngOnDestroy() {
    this.show = false;
    this.apiSubscription.unsubscribe();
  }

  private handleApiEevnt(event: string) {
    switch (event) {
      case 'user_group_list_received':
        this.userGroups = this.assignUserGroup.userGroups;
        this.pagination = this.assignUserGroup.pagination;
        break;
      case 'user_to_usergroup_assigned':
        this.global.apiSuccess = this.global.language.user_assign_add_to_classroom_success_message;
        this.closeWindow('');
        break;
    }
  }

  private getUserGroups() {
    this.userGroupApi.getUserGroups({});
  }

  private getDataTableColumns() {
    const columns = [];
    const productCodeCol = {
      prop: 'name',
      lockCol: true,
      name: this.global.language.product_code,
      sortable: true
    };
    const productTitleCol = {
      prop: 'instructor',
      lockCol: true,
      name: this.global.language.name,
      sortable: false
    };
    const productFormatCol = {
      prop: 'isActive',
      lockCol: true,
      name: this.global.language.format,
      sortable: false,
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
    this.dataTableColumns = columns;
  }
  sortByAction(event) {

  }
  onSelected(rows) {
    this.selectedRows = rows;
  }
  closeWindow(event) {
    this.show = false;
    this.onClose.emit(event);
  }
  onNext() {
    this.assignUserGroup.classrooms = this.selectedRows;
    this.userGroupApi.assignUserToUserGroups();
  }
}
