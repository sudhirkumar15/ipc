import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InstitutionAddComponent } from './institution-add.component';
import { FormComponent } from '../../../form/form.component';
import { AppFormModule } from '../../../form/app-form.module';
import { InstitutionAdminComponent } from './institution-admin/institution-admin.component';
import { InstitutionInfoComponent } from './institution-info/institution-info.component';
import { InstitutionSettingsComponent } from './institution-settings/institution-settings.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Global } from '../../../g';
import { InstitutionData } from '../../../data/bucket/institution.bucket';
import { InstitutionEventService } from '../service/institution-event.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Util } from '../../../util';
import { InstitutionApiService } from '../service/institution-api.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from '../../../service/error.service';
import { SiteData } from '../../../data/bucket/site.bucket';
import { CommonService } from '../../../service/common.service';
import { CommonData } from '../../../data/bucket/countries.bucket';

describe('InstitionAddComponent', () => {
  let component: InstitutionAddComponent;
  let fixture: ComponentFixture<InstitutionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppFormModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        InstitutionAddComponent,
        InstitutionAdminComponent,
        InstitutionInfoComponent,
        InstitutionSettingsComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
        InstitutionEventService,
        Util,
        InstitutionApiService,
        ErrorService,
        SiteData,
        CommonService,
        CommonData
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
