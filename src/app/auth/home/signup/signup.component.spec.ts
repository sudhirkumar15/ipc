import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaLoaderService } from 'ng-recaptcha/recaptcha/recaptcha-loader.service';
import { RecaptchaModule } from 'ng-recaptcha/recaptcha/recaptcha.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { PhoneNumberComponent } from '../../../controls/phone-number/phone-number.component';
import { Global } from '../../../g';
import { HttpClientModule } from '@angular/common/http';

import { Util } from '../../../util';
import { TenantData } from '../../../data/bucket/tenant.bucket';
import { AuthApiService } from '../../service/auth-api.service';
import { ErrorService } from '../../../service/error.service';
import { LoginUser } from '../../../data/bucket/login-user.bucket';
import { AuthEventService } from '../../service/auth-event.service';
import { CommonService } from '../../../service/common.service';
import { CommonData } from '../../../data/bucket/countries.bucket';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RecaptchaModule,
        RouterTestingModule,
        HttpClientModule],
      providers: [{
        provide: Global, useValue: {
          config: {
            siteKey: 'login',
          },
          language: {
            signUp: 'signUp',
          }
        }
      }, Util,
        TenantData,
        AuthApiService,
        ErrorService,
        LoginUser,
        AuthEventService,
        CommonService,
        CommonData,
        RecaptchaLoaderService
      ],
      declarations: [SignupComponent, PhoneNumberComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    component.siteKey = '123';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
