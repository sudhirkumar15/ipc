import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { SiteAdminComponent } from './site-admin.component';
import { AppFormModule } from '../../../form/app-form.module';
import { Global } from '../../../g';
import { SiteData } from '../../../data/bucket/site.bucket';
import { SiteApiService } from '../../service/site-api.service';
import { ErrorService } from '../../../service/error.service';
import { SiteEventService } from '../../service/site-event.service';
import { SiteService } from '../../service/site.service';
import { Util } from '../../../util';

describe('SiteAdminComponent', () => {
  let component: SiteAdminComponent;
  let fixture: ComponentFixture<SiteAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppFormModule,
        FormsModule,
        ReactiveFormsModule,
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
        SiteData,
        SiteApiService,
        ErrorService,
        SiteEventService,
        SiteService,
        Util
      ],
      declarations: [SiteAdminComponent, ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
