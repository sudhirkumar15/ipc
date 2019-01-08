import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from '../../../g';
import { SiteData } from '../../../data/bucket/site.bucket';
import { SiteApiService } from '../../service/site-api.service';
import { SiteEventService } from '../../service/site-event.service';
import { Util } from '../../../util';
import { ErrorService } from '../../../service/error.service';
@Component({
  selector: 'app-site-add-admin',
  templateUrl: './site-admin.component.html',
  styleUrls: ['./site-admin.component.scss']
})
export class SiteAdminComponent implements OnInit {
  siteAdminForm: FormGroup;
  url: any = [];
  isChecked: boolean;
  type: string;
  show: boolean;
  formSumitAttempt = false;
  constructor(
    public global: Global,
    private fb: FormBuilder,
    private siteData: SiteData,
    private siteApi: SiteApiService,
    private siteEvent: SiteEventService,
    public util: Util,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.createForm();
    this.isChecked = true;
    this.type = 'password';
    this.show = false;
  }
  onSiteAdminFormSubmit() { }
  togglePasswordField() {
    this.isChecked = !this.isChecked;
    this.siteAdminForm.get('password').reset();
  }
  showPassword() {
    this.show = !this.show;
    this.type = this.show ? 'text' : 'password';
  }
  backToSiteInfo() {
    this.siteEvent.siteApiEvent.next('siteinfo');
  }
  goToSiteSettings() {
    this.siteEvent.siteApiEvent.next('sitesettings');
  }
  private createForm() {
    this.siteAdminForm = this.fb.group({
      email: ['', [Validators.required,
              Validators.pattern(this.util.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  isFieldValid(field: string) {
    return this.errorService.isFieldValid(this.siteAdminForm, field, this.formSumitAttempt);
  }

  getErrorMessage(field: string) {
    return this.errorService.getErrorMessage(this.siteAdminForm, 'addUserForm', field);
  }

  displayFieldCss(field: string) {
     return this.errorService.displayFieldCss(this.siteAdminForm, field, this.formSumitAttempt);
  }
}
