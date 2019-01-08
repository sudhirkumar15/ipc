import { Component, OnInit } from '@angular/core';
import { Global } from '../../../g';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SiteData } from '../../../data/bucket/site.bucket';
import { SiteApiService } from '../../service/site-api.service';
import { Route } from '@angular/router/src/config';
import { Router } from '@angular/router';
import { ErrorService } from '../../../service/error.service';

@Component({
  selector: 'app-site-add-info',
  templateUrl: './site-info.component.html',
  styleUrls: ['./site-info.component.scss']
})
export class SiteInfoComponent implements OnInit {
  siteInfoForm: FormGroup;
  url: any = [];
  formSumitAttempt = false;
  constructor(public global: Global,
    private fb: FormBuilder,
    private siteData: SiteData,
    private siteApi: SiteApiService,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.createForm();
    this.siteData.AddNewSitePostData.activeTabName = 'siteinfo';
    this.siteInfoForm.reset();
  }
  onSiteFormSubmit() {
    this.formSumitAttempt = true;
    if (this.siteInfoForm.valid) {
      this.siteData.AddNewSitePostData.value = this.siteInfoForm.value;
      this.siteData.AddNewSitePostData.value.code = this.siteInfoForm.value.name;
      this.siteApi.createSiteInfo();
    }
  }
  cancelSiteCreation() {
    this.router.navigate(['/sites']);
  }
  addnewUrl() {
    this.url = this.siteInfoForm.get('url') as FormArray;
    this.url.push(this.createUrls());
  }
  private createForm() {
    this.siteInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      url: <FormArray>this.fb.array([this.createUrls()])
    });
  }
  createUrls(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.pattern('.*\\S.*[a-zA-z0-9_-]')]],
    });
  }
  isFieldValid(field: string) {
    return this.errorService.isFieldValid(this.siteInfoForm, field, this.formSumitAttempt);
  }

  getErrorMessage(field: string) {
    return this.errorService.getErrorMessage(this.siteInfoForm, 'siteInfoForm', field);
  }

  displayFieldCss(field: string) {
    return this.errorService.displayFieldCss(this.siteInfoForm, field, this.formSumitAttempt);
  }
   isFieldValidUrl(urlForm, field: string) {
    return this.errorService.isFieldValid(urlForm, field, this.formSumitAttempt);
  }

  getErrorMessageUrl(urlForm, field: string) {
    return this.errorService.getErrorMessage(urlForm, 'siteInfoForm_url', field);
  }

  displayFieldCssUrl(urlForm, field: string) {
    return this.errorService.displayFieldCss(urlForm, field, this.formSumitAttempt);
  }
}

