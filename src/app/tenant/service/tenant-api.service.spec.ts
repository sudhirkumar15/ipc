import { TestBed, inject } from '@angular/core/testing';

import { TenantApiService } from './tenant-api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from '../../service/error.service';
import { Global } from '../../g';
import { TenantData } from '../../data/bucket/tenant.bucket';
import { TenantService } from './tenant.service';

describe('TenantApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        TenantApiService,
        ErrorService,
        Global,
        TenantData,
        TenantService
      ]
    });
  });

  it('should be created', inject([TenantApiService], (service: TenantApiService) => {
    expect(service).toBeTruthy();
  }));
});
