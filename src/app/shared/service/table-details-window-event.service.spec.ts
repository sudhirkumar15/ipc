import { TestBed, inject } from '@angular/core/testing';

import { TableDetailsWindowEventService } from './table-details-window-event.service';

describe('TableDetailsWindowEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableDetailsWindowEventService]
    });
  });

  it('should be created', inject([TableDetailsWindowEventService], (service: TableDetailsWindowEventService) => {
    expect(service).toBeTruthy();
  }));
});
