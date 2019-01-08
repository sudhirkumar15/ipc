import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TenantAdminComponent } from './tenant-admin.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Global } from '../../../g';
import { TenantData } from '../../../data/bucket/tenant.bucket';
import { RouterTestingModule } from '@angular/router/testing';
import { Util } from '../../../util';
import { TenantApiService } from '../../service/tenant-api.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from '../../../service/error.service';
import { TenantService } from '../../service/tenant.service';

describe('TenantAdminComponent', () => {
  let component: TenantAdminComponent;
  let fixture: ComponentFixture<TenantAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [TenantAdminComponent],
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
        Util,
        TenantApiService,
        ErrorService,
        TenantService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
