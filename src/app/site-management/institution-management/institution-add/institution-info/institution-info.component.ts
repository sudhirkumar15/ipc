import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../../../../g';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { InstitutionData } from './../../../../data/bucket/institution.bucket';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from '../../../../util';
import { InstitutionApiService } from '../../service/institution-api.service';
import { CommonService } from '../../../../service/common.service';
import { CommonData } from '../../../../data/bucket/countries.bucket';
import { ErrorService } from '../../../../service/error.service';
import { OnError } from '../../../../data/model/application.model';

@Component({
  selector: 'app-institution-add-info',
  templateUrl: './institution-info.component.html',
  styleUrls: ['./institution-info.component.scss']
})
export class InstitutionInfoComponent implements OnInit, OnError {
  institutionInfoForm: FormGroup;
  countryList;
  siteId: number;
  selectedCountry: string;
  @ViewChild('ul') ul: ElementRef;
  keyTypeText = '';
  formSumitAttempt = false;
  constructor(public global: Global,
    private fb: FormBuilder,
    private institutionData: InstitutionData,
    private router: Router,
    public util: Util,
    private institutionApi: InstitutionApiService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    public commonDataStore: CommonData,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.institutionData.AddNewInstitutiontData.activeTabName = 'institutioninfo';
    this.countryList = { 'default': '+91', 'data': [{ 'value': '+91', 'label': 'India' }, { 'value': '+92', 'label': 'Pakistan' }] };
    this.createForm();
    this.route.params.subscribe(params => {
      this.siteId = +params['siteId'];
    });
    this.commonService.getCountries();
    this.selectedCountry = 'India';
  }

  private createForm() {
    this.institutionInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.util.namePattern)]],
      code: [''],
      address: [''],
      country: [''],
      email: ['', [Validators.required, Validators.pattern(this.util.emailPattern)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.util.phoneNumberPattern)]],
      countrycode: [this.global.countryCode, [Validators.required]],
      contacts: <FormArray>this.fb.array([this.addContacts()])
    });
  }

  onInstitutionFormSubmit() {
    this.formSumitAttempt = true;
    if (this.institutionInfoForm.valid) {
      this.institutionData.AddNewInstitutiontData.value = this.institutionInfoForm.value;
      this.institutionApi.createInstitutionInfo(this.siteId);
    }
  }

  cancelInstitutionCreation() {
    this.router.navigate(['/sites', this.siteId, 'institutions']);
  }

  addContacts(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.util.emailPattern)]],
      firstName: ['', [Validators.required, Validators.minLength(3),
        Validators.pattern(this.util.namePattern)]],
      designation: [''],
      countrycode: [this.global.countryCode, [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.util.phoneNumberPattern)]],
    });
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
  isFieldValid(field: string) {
    return this.errorService.isFieldValid(this.institutionInfoForm, field, this.formSumitAttempt);
  }

  getErrorMessage(field: string) {
    return this.errorService.getErrorMessage(this.institutionInfoForm, 'institution_info', field);
  }

  displayFieldCss(field: string) {
    return this.errorService.displayFieldCss(this.institutionInfoForm, field, this.formSumitAttempt);
  }
}
