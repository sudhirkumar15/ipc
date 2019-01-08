import { TestBed, inject } from '@angular/core/testing';

import { AssetsApiEventService } from './assets-api-event.service';

describe('AssetsApiEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetsApiEventService]
    });
  });

  it('should be created', inject([AssetsApiEventService], (service: AssetsApiEventService) => {
    expect(service).toBeTruthy();
  }));
});
