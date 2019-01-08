import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from '../../../../g';
import { InstitutionData } from './../../../../data/bucket/institution.bucket';
import { InstitutionApiService } from '../../service/institution-api.service';
import { InstitutionEventService } from '../../service/institution-event.service';
import { Util } from '../../../../util';
import { ErrorService } from '../../../../service/error.service';
import { OnError } from '../../../../data/model/application.model';

@Component({
  selector: 'app-institution-add-admin',
  templateUrl: './institution-admin.component.html',
  styleUrls: ['./institution-admin.component.scss']
})
export class InstitutionAdminComponent implements OnInit, OnError {
  institutionAdminForm: FormGroup;
  isChecked: boolean;
  type: string;
  showIcon: boolean;
  formSumitAttempt = false;
  constructor(
    public global: Global,
    private fb: FormBuilder,
    private institutionData: InstitutionData,
    private institutionApi: InstitutionApiService,
    private institutionEvent: InstitutionEventService,
    public util: Util,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.createForm();
  }
  showPassword() {
    this.showIcon = !this.showIcon;
    this.type = this.showIcon ? 'text' : 'password';
  }
  backToInstitutionInfo() {
    this.institutionEvent.institutionApiEvent.next('institutioninfo');
  }
  goToInstitutionSettings() {
    this.institutionEvent.institutionApiEvent.next('institutionsettings');
  }
  private createForm() {
    this.institutionAdminForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.util.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  isFieldValid(field: string) {
    return this.errorService.isFieldValid(this.institutionAdminForm, field, this.formSumitAttempt);
  }

  getErrorMessage(field: string) {
    return this.errorService.getErrorMessage(this.institutionAdminForm, 'institution_admin', field);
  }

  displayFieldCss(field: string) {
    return this.errorService.displayFieldCss(this.institutionAdminForm, field, this.formSumitAttempt);
  }
}
