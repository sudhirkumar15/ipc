import { TestBed, inject } from '@angular/core/testing';

import { ErrorService } from './error.service';
import { Global } from '../g';

describe('ErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorService, Global]
    });
  });

  it('should be created', inject([ErrorService], (service: ErrorService) => {
    expect(service).toBeTruthy();
  }));
});
