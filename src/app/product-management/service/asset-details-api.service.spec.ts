import { TestBed, inject } from '@angular/core/testing';

import { AssetDetailsApiService } from './asset-details-api.service';

describe('AssetDetailsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetDetailsApiService]
    });
  });

  it('should be created', inject([AssetDetailsApiService], (service: AssetDetailsApiService) => {
    expect(service).toBeTruthy();
  }));
});
