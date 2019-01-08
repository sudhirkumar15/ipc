import { TestBed, inject } from '@angular/core/testing';

import { AssetLinkApiService } from './asset-link-api.service';

describe('AssetLinkApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetLinkApiService]
    });
  });

  it('should be created', inject([AssetLinkApiService], (service: AssetLinkApiService) => {
    expect(service).toBeTruthy();
  }));
});
