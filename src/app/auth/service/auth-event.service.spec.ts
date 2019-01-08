import { TestBed, inject } from '@angular/core/testing';

import { AuthEventService } from './auth-event.service';

describe('AuthEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthEventService]
    });
  });

  it('should be created', inject([AuthEventService], (service: AuthEventService) => {
    expect(service).toBeTruthy();
  }));
});
