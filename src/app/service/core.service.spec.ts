import { TestBed, inject } from '@angular/core/testing';

import { CoreService } from './core.service';
import { HttpModule } from '@angular/http';
import { TenantData } from '../data/bucket/tenant.bucket';
import { ErrorService } from './error.service';
import { Global } from '../g';

describe('CoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [CoreService, TenantData, ErrorService, Global]
    });
  });

  it('should be created', inject([CoreService], (service: CoreService) => {
    expect(service).toBeTruthy();
  }));
});
