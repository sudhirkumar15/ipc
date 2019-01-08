import { TestBed, inject } from '@angular/core/testing';

import { RoleApiService } from './role-api.service';
import { CoreService } from './core.service';
import { HttpModule } from '@angular/http';
import { TenantData } from '../data/bucket/tenant.bucket';
import { ErrorService } from './error.service';
import { Global } from '../g';
import { RoleData } from '../data/bucket/role.bucket';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RoleService } from '../user-and-role-management/role/service/role.service';
import { ApiEventService } from './api-event.service';

describe('RoleApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [RoleApiService,
      CoreService,
      TenantData,
      ErrorService,
      Global,
      RoleData,
      RoleService,
      ApiEventService
      ]
    });
  });

  it('should be created', inject([RoleApiService], (service: RoleApiService) => {
    expect(service).toBeTruthy();
  }));
});
