import { TestBed, inject } from '@angular/core/testing';

import { InitService } from './init.service';
import { APIService } from './api.service';
import { CoreService } from './core.service';
import { HttpModule } from '@angular/http';
import { TenantData } from '../data/bucket/tenant.bucket';
import { ErrorService } from './error.service';
import { Global } from '../g';
import { RoleData } from '../data/bucket/role.bucket';

describe('InitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [InitService, APIService, CoreService,
        Global, RoleData,
        TenantData, ErrorService]
    });
  });

  it('should be created', inject([InitService], (service: InitService) => {
    expect(service).toBeTruthy();
  }));
});
