import { TestBed, inject } from '@angular/core/testing';

import { TenantEventService } from './tenant-event.service';

describe('TenantEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantEventService]
    });
  });

  it('should be created', inject([TenantEventService], (service: TenantEventService) => {
    expect(service).toBeTruthy();
  }));
});
