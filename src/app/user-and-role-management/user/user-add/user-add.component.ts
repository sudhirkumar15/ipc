import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { Global } from 'app/g';
import { Util } from 'app/util';
import { UserData } from '@repository/bucket/user.bucket';
import { UserApiService } from '@users/service/user-api.service';
import { RoleApiService } from '@roles/service/role-api.service';
import { RoleData } from '@repository/bucket/role.bucket';
import { RoleListAPIResponseModel } from '@repository//model/role.model';
import { PaginationModel } from '@repository/pagination.model';
import { ErrorService } from '@services/error.service';
import { OnError } from '@repository/model/application.model';
import { RoleEventService } from '@roles/service/role-event.service';
import { UserService } from '@users/service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit, OnError {
  addUserForm: FormGroup;
  assignRoleList: Array<Object> = [];
  selectedRolelist: Array<string> = [];
  selectedRole: string;
  isDropDownOpen = false;
  type = 'password';
  show = false;
  page: PaginationModel;
  formSumitAttempt = false;
  constructor(public global: Global,
    private fb: FormBuilder,
    public util: Util,
    private router: Router,
    private userData: UserData,
    private userApi: UserApiService,
    private roleApiService: RoleApiService,
    public roleList: RoleData,
    private errorService: ErrorService,
    private roleEvent: RoleEventService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.page = {
      isFirst: false,
      isLast: false,
      pageNumber: 0,
      pageSize: 1000,
      totalPages: 0,
      totalCount: 0
    };
    this.initModel();
    this.createForm();
    this.selectedRole = this.global.language.role_label_select_role;
    this.getRoles();
    this.roleEvent.roleApiEvent.subscribe((data) => this.handleRoleEvent(data));
    this.userService.userEvent.subscribe((data) => this.handleUserEvent(data));
  }

  private handleUserEvent(event: string) {
    switch (event) {
      case 'user_created':
        this.addRolesToUser();
        break;
      case 'user_creation_error':
        break;
      case 'user_role_created':
        this.global.apiSuccess = this.global.language.user_message_new_user_created;
        break;
      case 'user_role_creation_error':
        this.global.apiSuccess = this.global.language.user_error_new_user_created_role_failed;
        this.cancelUserCreation();
        break;
    }
  }

  private handleRoleEvent(event: string) {
    switch (event) {
      case 'getroles':
        this.addRolesToForm();
        break;
    }
  }

  private addRolesToUser() {
    this.userApi.assignRolesToUser();
  }

  private addRolesToForm() {
    const control = <FormArray>this.addUserForm.controls['roles'];
    for (const role of this.roleList.RoleListData.value.data.roles) {
      control.push(this.fb.group({
        id: [role.id],
        roleSelected: [''],
        name: [role.name]
      }));
    }
  }

  private initModel() {
    const responseModel: RoleListAPIResponseModel | any = {};
    responseModel.data = { roles: [], _pagination: this.page };
    this.roleList.RoleListData.value = responseModel;
  }

  private getRoles() {
    this.roleList.RoleListData.value.data._pagination.pageNumber = 0;
    this.roleList.RoleListData.value.data._pagination.pageSize = 1000;
    this.roleApiService.getroles();
  }

  onUserAddFormSubmit() {
    this.formSumitAttempt = true;
    if (this.addUserForm.valid) {
      this.userData.AddNewUserPostData.value = this.addUserForm.value;
      this.userData.AddNewUserPostData.value.roles = this.addUserForm.value.roles.filter(role => role.roleSelected === true);
      this.userApi.createUser();
    }
  }

  private createForm() {
    this.addUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required,
      Validators.pattern(this.util.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.pattern(this.util.phoneNumberPattern)]],
      countrycode: [this.global.countryCode, [Validators.required]],
      roles: <FormArray>this.fb.array([])
    });
  }

  onDropdownOutsideClick(event) {
    if (this.isDropDownOpen) {
      this.isDropDownOpen = !this.isDropDownOpen;
    }
  }

  onChange(index: number, isChecked: boolean) {
    const roles = this.addUserForm.controls['roles'].value;
    if (isChecked) {
      this.selectedRolelist.push(roles[index].name);
    } else {
      this.selectedRolelist = [];
      this.selectedRolelist = roles.filter(function (role) {
        return role.roleSelected;
      }).map(function (role) {
        return role.name;
      });
    }
  }

  toggleShow() {
    this.show = !this.show;
    this.type = this.show ? 'text' : 'password';
  }

  cancelUserCreation() {
    this.router.navigate(['roles/users']);
  }
  isFieldValid(field: string) {
    return this.errorService.isFieldValid(this.addUserForm, field, this.formSumitAttempt);
  }

  getErrorMessage(field: string) {
    return this.errorService.getErrorMessage(this.addUserForm, 'user', field);
  }

  displayFieldCss(field: string) {
    return this.errorService.displayFieldCss(this.addUserForm, field, this.formSumitAttempt);
  }
}
