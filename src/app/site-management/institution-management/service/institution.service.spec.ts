import { TestBed, inject } from '@angular/core/testing';

import { InstitutionService } from './institution.service';

describe('SiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstitutionService]
    });
  });

  it('should be created', inject([InstitutionService], (service: InstitutionService) => {
    expect(service).toBeTruthy();
  }));
});
