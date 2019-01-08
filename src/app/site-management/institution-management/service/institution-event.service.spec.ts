import { TestBed, inject } from '@angular/core/testing';

import { InstitutionEventService } from './institution-event.service';

describe('SiteEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstitutionEventService]
    });
  });

  it('should be created', inject([InstitutionEventService], (service: InstitutionEventService) => {
    expect(service).toBeTruthy();
  }));
});
