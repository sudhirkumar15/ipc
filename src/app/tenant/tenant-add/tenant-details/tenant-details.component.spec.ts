import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TenantDetailsComponent } from './tenant-details.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Global } from '../../../g';
import { TenantData } from '../../../data/bucket/tenant.bucket';
import { TenantApiService } from '../../service/tenant-api.service';
import { ErrorService } from '../../../service/error.service';
import { TenantService } from '../../service/tenant.service';
import { Util } from '../../../util';
import { CommonService } from '../../../service/common.service';
import { CommonData } from '../../../data/bucket/countries.bucket';

describe('TenantDetailsComponent', () => {
  let component: TenantDetailsComponent;
  let fixture: ComponentFixture<TenantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TenantDetailsComponent],
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
        TenantData,
        TenantApiService,
        ErrorService,
        TenantService,
        Util,
        CommonService,
        CommonData
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
