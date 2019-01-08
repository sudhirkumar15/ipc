import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { InstitutionAdminComponent } from './institution-admin.component';
import { Global } from '../../../../g';
import { InstitutionData } from '../../../../data/bucket/institution.bucket';
import { InstitutionApiService } from '../../service/institution-api.service';
import { ErrorService } from '../../../../service/error.service';
import { InstitutionEventService } from '../../service/institution-event.service';
import { SiteData } from '../../../../data/bucket/site.bucket';
import { Util } from '../../../../util';

describe('InstitutionAdminComponent', () => {
  let component: InstitutionAdminComponent;
  let fixture: ComponentFixture<InstitutionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
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
        InstitutionApiService,
        ErrorService,
        InstitutionEventService,
        SiteData,
        Util
      ],
      declarations: [InstitutionAdminComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
