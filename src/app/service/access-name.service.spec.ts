import { TestBed, inject } from '@angular/core/testing';

import { AccessNameService } from './access-name.service';

describe('AccessNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessNameService]
    });
  });

  it('should be created', inject([AccessNameService], (service: AccessNameService) => {
    expect(service).toBeTruthy();
  }));
});
