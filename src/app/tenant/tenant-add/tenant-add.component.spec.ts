import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TenantAddComponent } from './tenant-add.component';
import { AppFormModule } from '../../form/app-form.module';
import { Global } from '../../g';
import { TenantData } from '../../data/bucket/tenant.bucket';
import { TenantEventService } from '../service/tenant-event.service';

describe('TenantAddComponent', () => {
  let component: TenantAddComponent;
  let fixture: ComponentFixture<TenantAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppFormModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [TenantAddComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
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
        TenantData,
        TenantEventService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
