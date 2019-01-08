import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantListComponent } from './tenant-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TenantData } from '../../data/bucket/tenant.bucket';
import { Global } from '../../g';
import { APIService } from '../../service/api.service';
import { CoreService } from '../../service/core.service';
import { HttpModule } from '@angular/http';
import { ErrorService } from '../../service/error.service';
import { RoleData } from '../../data/bucket/role.bucket';
import { RouterTestingModule } from '@angular/router/testing';
import { TenantApiService } from '../service/tenant-api.service';
import { HttpClientModule } from '@angular/common/http';
import { TenantService } from '../service/tenant.service';

class MockTenantApiService {
  getTenantList() { }
}
describe('TenantListComponent', () => {
  let component: TenantListComponent;
  let fixture: ComponentFixture<TenantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [TenantListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Global, useValue: {
            config: {
              pageSizes: [10]
            },
            language: {
              signUp: 'signUp',
            }
          }
        },
        TenantData,
        APIService,
        CoreService,
        ErrorService,
        RoleData,
        {provide: TenantApiService, useClass: MockTenantApiService},
        TenantService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
