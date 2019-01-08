import { TestBed, inject } from '@angular/core/testing';

import { ApiEventService } from './api-event.service';

describe('ApiEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiEventService]
    });
  });

  it('should be created', inject([ApiEventService], (service: ApiEventService) => {
    expect(service).toBeTruthy();
  }));
});
