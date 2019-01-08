import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormControl, Validators, FormGroup } from '@angular/forms';

import { Global } from 'app/g';
import { TenantData } from '@repository/bucket/tenant.bucket';
import { Util } from 'app/util';
import { TenantApiService } from '@tenants/service/tenant-api.service';
import { ErrorService } from '@services/error.service';
import { OnError } from '@repository/model/application.model';

@Component({
  selector: 'app-tenant-add-admin',
  templateUrl: './tenant-admin.component.html',
  styleUrls: ['./tenant-admin.component.scss']
})
export class TenantAdminComponent implements OnInit, OnError {
  tenantAdminForm: FormGroup;
  type: string;
  showPassword: boolean;
  formSubmitAttempt = false;
  constructor(public global: Global,
    private fb: FormBuilder,
    public tenantData: TenantData,
    private router: Router,
    public util: Util,
    private tenantApi: TenantApiService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.createForm();
    this.type = 'password';
    this.showPassword = false;
  }

  private createForm() {
    this.tenantAdminForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.pattern(this.util.phoneNumberPattern)]],
      email: ['', [Validators.required, Validators.pattern(this.util.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      countrycode: [this.global.countryCode, [Validators.required]]
    });
  }

  onTenantAdminFormSubmit() {
    this.formSubmitAttempt = true;
    if (this.tenantAdminForm.valid) {
      this.tenantData.tenant.phone = `${this.tenantAdminForm.value['countrycode']}-${this.tenantAdminForm.value['phoneNumber']}`;
      this.tenantData.tenant = Object.assign(this.tenantData.tenant, this.tenantAdminForm.value);
      this.tenantApi.createNewTenant();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }

  backToTenantDetails() {
    this.tenantData.activeTabName = 'tenantdetails';
  }

  tenantCreated() {
    this.router.navigate(['/tenants']);
    this.global.apiSuccess = this.global.language.newTenantAdded;
  }

  isFieldValid(field: string) {
    return this.errorService.isFieldValid(this.tenantAdminForm, field, this.formSubmitAttempt);
  }

  getErrorMessage(field: string) {
    return this.errorService.getErrorMessage(this.tenantAdminForm, 'tenant_admin', field);
  }

  displayFieldCss(field: string) {
    return this.errorService.displayFieldCss(this.tenantAdminForm, field, this.formSubmitAttempt);
  }
}
