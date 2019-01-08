import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormArray, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Global } from 'app/g';
import { TenantData } from '@repository/bucket/tenant.bucket';
import { TenantApiService } from '@tenants/service/tenant-api.service';
import { Util } from 'app/util';
import { CommonService } from '@services/common.service';
import { CommonData } from '@repository/bucket/countries.bucket';
import { ErrorService } from '@services/error.service';
import { OnError } from '@repository/model/application.model';

@Component({
  selector: 'app-tenant-add-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.scss']
})
export class TenantDetailsComponent implements OnInit, OnError {
  tenantDetailsForm: FormGroup;
  selectedCountry: string;
  @ViewChild('ul') ul: ElementRef;
  keyTypeText = '';
  formSubmitAttempt = false;
  index: number;
  constructor(public global: Global,
    private fb: FormBuilder,
    public tenantData: TenantData,
    private router: Router,
    private tenantApi: TenantApiService,
    public util: Util,
    private commonService: CommonService,
    public commonDataStore: CommonData,
    private errorService: ErrorService,
    private renderer2: Renderer2
  ) { }

  ngOnInit() {
    this.tenantData.activeTabName = 'tenantdetails';
    this.createForm();
    this.selectedCountry = this.global.selectedCountry;
    this.index = -1;
  }

  private createForm() {
    this.tenantDetailsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['tenant'],
      address: [''],
      country: [''],
      contactEmail: ['', [Validators.required, Validators.pattern(this.util.emailPattern)]],
      phoneNumber: ['', [Validators.pattern(this.util.phoneNumberPattern)]],
      countrycode: [this.global.countryCode, [Validators.required]],
      contacts: <FormArray>this.fb.array([this.addContact()])
    });
  }

  onTenantFormSubmit() {
    this.formSubmitAttempt = true;
    if (this.tenantDetailsForm.valid) {
      this.tenantDetailsForm.value['company'] = this.tenantDetailsForm.value['name'];
      this.tenantData.tenant = this.tenantDetailsForm.value;
      this.tenantData.tenant.phone = `${this.tenantDetailsForm.value['countrycode']}-${this.tenantDetailsForm.value['phoneNumber']}`;
      for (let i = 0; i < this.tenantData.tenant.contacts.length; i++) {
        this.tenantData.tenant.contacts[i].phone = `${this.tenantData.tenant.contacts[i].countrycode}-
          ${this.tenantData.tenant.contacts[i].phoneNumber}`;
      }
      this.tenantData.activeTabName = 'tenantadmin';
    }
  }
  triggerListItemClick(itemValue) {
    this.selectedCountry = itemValue;
  }

  onOptionClick(event) {
    const currentList = event.currentTarget.getElementsByClassName('ul-list')[0];
    currentList.style.display = currentList.style.display === 'none' || currentList.style.display === '' ? 'block' : 'none';
    this.ul.nativeElement.children[0].focus();
    this.keyTypeText = '';
  }

  focusSelectedValue(event: KeyboardEvent) {
    this.keyTypeText = event.key.trim();
    const searchedIndex = [];
    const filtered_data = this.commonDataStore.countries.value.data.countries.filter((item, index) => {
      if (item['name'].toLowerCase().startsWith(this.keyTypeText.toLowerCase())) {
        searchedIndex.push(index);
        return index;
      }
    });
    if (searchedIndex.length > 0) {
      this.ul.nativeElement.children[searchedIndex[0]].focus();
    }
  }

  cancelTenantCreation() {
    this.router.navigate(['/tenants']);
  }

  addContact(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.util.emailPattern)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      designation: [''],
      phoneNumber: ['', [Validators.pattern(this.util.phoneNumberPattern)]],
      countrycode: [this.global.countryCode, [Validators.required]]
    });
  }

  isFieldValid(field: string) {
    return this.errorService.isFieldValid(this.tenantDetailsForm, field, this.formSubmitAttempt);
  }

  getErrorMessage(field: string) {
    return this.errorService.getErrorMessage(this.tenantDetailsForm, 'tenant_details', field);
  }

  displayFieldCss(field: string) {
    return this.errorService.displayFieldCss(this.tenantDetailsForm, field, this.formSubmitAttempt);
  }
  onKeyUpDown(event: KeyboardEvent) {
    const list = document.querySelectorAll('.listing');
    if (event['keyCode'] === 38 && document.querySelector('.ul-list').getAttribute('aria-hidden') === 'false') {
      if (this.index > 0) {
        const element = list[this.index - 1] as HTMLElement;
        element.focus();
        this.index = this.index - 1;
      }
    }
    if (event['keyCode'] === 40 && document.querySelector('.ul-list').getAttribute('aria-hidden') === 'false') {
      if (list.length > this.index) {
        if (this.index === -1) {
          const element = list[this.index + 2] as HTMLElement;
          element.focus();
        } else {
          const element = list[this.index + 1] as HTMLElement;
          element.focus();
        }
        this.index = this.index + 1;
      }
    }
    if (event['keyCode'] === 32 || event['keyCode'] === 13) {
      const el = document.activeElement as HTMLElement;
      el.click();
    }
    return false;
  }
}
