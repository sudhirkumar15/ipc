import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Global } from 'app/g';
import { Util } from 'app/util';
import { TenantData } from '@repository/bucket/tenant.bucket';
import { APIService } from '@services/api.service';
import { AuthApiService } from '@auth/service/auth-api.service';
import { AuthEventService } from '@auth/service/auth-event.service';
import { ErrorService } from '@services/error.service';
import { OnError } from '@repository/model/application.model';
import { ApiValidator } from '@shared/validators/api.validator';
import { ValidatorService } from '@shared/service/validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy, OnError {
  signUpForm: FormGroup;
  captcha = 'captcha';
  type = 'password';
  show = false;
  showCode = false;
  countryList;
  showLoader = false;
  siteKey: string;
  authEventSubscription: Subscription;
  formSumitAttempt = false;
  constructor(
    private router: Router,
    public global: Global,
    public util: Util,
    private tenantData: TenantData,
    private authApi: AuthApiService,
    private authEventService: AuthEventService,
    private fb: FormBuilder,
    private errorService: ErrorService,
    private validatorService: ValidatorService
  ) {
  }

  ngOnInit() {
    this.showLoader = false;
    this.createForm();
    this.authEventSubscription = this.authEventService.authEvent.subscribe(event => this.handleApiEvent(event));
    this.siteKey = this.global.config['siteKey'];
  }

  ngOnDestroy() {
    this.authEventSubscription.unsubscribe();
  }
  private handleApiEvent(event) {
    switch (event) {
      case 'registration_ok':
        this.showLoader = false;
        this.global.apiSuccess = this.global.language.newTenantAdded;
        this.router.navigate(['/login']);
        break;
      case 'registration_failed':
        this.showLoader = false;
        this.showLoader = false;
        this.errorService.setError(this.tenantData.error);
        break;
    }
  }

  resolved(response: any) {
    this.captcha = response;
  }

  createForm() {
    this.signUpForm = this.fb.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(this.util.nameMinLength),
          Validators.maxLength(this.util.nameMaxLength),
          Validators.pattern(this.util.nameAllPattern),
        ], [
          ApiValidator.alreadyexists(this.validatorService, 'tenant', 'name')
        ]
      ],
      contactEmail: ['',
        [
          Validators.required,
          Validators.minLength(this.util.emailMinLength),
          Validators.maxLength(this.util.emailMaxLength),
          Validators.pattern(this.util.emailPattern)
        ]
      ],
      phonenumber: ['',
        [
          Validators.required,
          Validators.pattern(this.util.phoneNumberPattern)
        ],
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(this.util.passwordMinLength),
          Validators.maxLength(this.util.passwordMaxLength),
        ],
      ],
      countrycode: [this.global.countryCode,
      [
        Validators.required,
      ]
      ]
    }
    );
  }

  toggleShow() {
    this.show = !this.show;
    this.type = this.show ? 'text' : 'password';
  }

  register() {
    this.formSumitAttempt = true;
    if (this.captcha || window.location.href.indexOf('localhost') !== -1) {
      if (this.signUpForm.valid) {
        this.showLoader = true;
        this.tenantData.tenant = this.signUpForm.value;
        this.tenantData.tenant.type = 'tenant';
        this.tenantData.tenant.phone = `${this.signUpForm.value['countrycode']}-${this.signUpForm.value['phonenumber']}`;
        this.tenantData.tenant.email = this.tenantData.tenant.contactEmail;
        this.tenantData.tenant.company = this.tenantData.tenant.firstName = this.tenantData.tenant.name;
        this.authApi.register();
      }
    } else {
      this.captcha = 'false';
    }
  }

  isFieldValid(field: string) {
    return this.errorService.isFieldValid(this.signUpForm, field, this.formSumitAttempt);
  }

  getErrorMessage(field: string) {
    return this.errorService.getErrorMessage(this.signUpForm, 'signup', field);
  }

  displayFieldCss(field: string) {
    return this.errorService.displayFieldCss(this.signUpForm, field, this.formSumitAttempt);
  }
}
