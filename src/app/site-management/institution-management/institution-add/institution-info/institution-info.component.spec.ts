import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstitutionApiService } from '../../service/institution-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';


import { InstitutionInfoComponent } from './institution-info.component';
import { PhoneNumberComponent } from '../../../../controls/phone-number/phone-number.component';
import { Global } from '../../../../g';
import { InstitutionData } from '../../../../data/bucket/institution.bucket';
import { Util } from '../../../../util';
import { ErrorService } from '../../../../service/error.service';
import { InstitutionEventService } from '../../service/institution-event.service';
import { SiteData } from '../../../../data/bucket/site.bucket';
import { CommonService } from '../../../../service/common.service';
import { CommonData } from '../../../../data/bucket/countries.bucket';

describe('InstitutionInfoComponent', () => {
  let component: InstitutionInfoComponent;
  let fixture: ComponentFixture<InstitutionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: Global, useValue: {
            config: {
              siteKey: 'login',
            },
            language: {
              signUp: 'signUp',
            }
          }
        },
        InstitutionData,
        Util,
        InstitutionApiService,
        ErrorService,
        InstitutionEventService,
        SiteData,
        CommonService,
        CommonData
      ],
      declarations: [InstitutionInfoComponent, PhoneNumberComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
