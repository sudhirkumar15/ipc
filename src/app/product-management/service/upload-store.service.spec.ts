import { TestBed, inject } from '@angular/core/testing';

import { UploadStoreService } from './upload-store.service';

describe('UploadStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadStoreService]
    });
  });

  it('should be created', inject([UploadStoreService], (service: UploadStoreService) => {
    expect(service).toBeTruthy();
  }));
});
