import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Util } from '../../../../util';
import { Global } from '../../../../g';
import { RoleData } from '../../../../data/bucket/role.bucket';
import { RoleModel } from '../../../../data/model/role.model';
import { APIService } from '../../../../service/api.service';
import { RoleEventService } from '../../service/role-event.service';
import { Subscription } from 'rxjs/Subscription';
import { RoleApiService } from '../../service/role-api.service';
import { ErrorService } from '../../../../service/error.service';

@Component({
  selector: 'app-role-add-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {
  roleDetailsForm: FormGroup;
  formSumitAttempt = false;
  constructor(public global: Global,
    private fb: FormBuilder,
    public roleData: RoleData,
    private roleApi: RoleApiService,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.createForm();
    this.roleData.AddNewRolePostData.activeTabName = 'roledetails';
  }
  onRoleDetailsFormSubmit() {
    this.formSumitAttempt = true;
    if (this.roleDetailsForm.valid) {
      this.roleDetailsForm.value['code'] = this.roleDetailsForm.value.name;
      this.roleDetailsForm.value['type'] = 'tenant';
      this.roleData.AddNewRolePostData.value = this.roleDetailsForm.value;
      this.roleApi.addNewRole();
    }
  }

  cancelRoleCreation() {
    this.router.navigate(['/roles']);
  }

  createForm() {
    this.roleDetailsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  isFieldValid(field: string) {
    return this.errorService.isFieldValid(this.roleDetailsForm, field, this.formSumitAttempt);
  }

  getErrorMessage(field: string) {
    return this.errorService.getErrorMessage(this.roleDetailsForm, 'roleDetailsForm', field);
  }

  displayFieldCss(field: string) {
    return this.errorService.displayFieldCss(this.roleDetailsForm, field, this.formSumitAttempt);
  }

}


