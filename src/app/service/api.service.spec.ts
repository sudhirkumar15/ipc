import { TestBed, inject } from '@angular/core/testing';

import { APIService } from './api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CoreService } from './core.service';
import { TenantData } from '../data/bucket/tenant.bucket';
import { ErrorService } from './error.service';
import { Global } from '../g';
import { RoleData } from '../data/bucket/role.bucket';

describe('APIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpModule
      ],
      providers: [APIService, CoreService, TenantData, ErrorService, Global, RoleData]
    });
  });

  it('should be created', inject([APIService], (service: APIService) => {
    expect(service).toBeTruthy();
  }));
});
