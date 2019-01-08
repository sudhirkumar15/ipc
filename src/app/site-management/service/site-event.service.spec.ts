import { TestBed, inject } from '@angular/core/testing';

import { SiteEventService } from './site-event.service';

describe('SiteEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteEventService]
    });
  });

  it('should be created', inject([SiteEventService], (service: SiteEventService) => {
    expect(service).toBeTruthy();
  }));
});
