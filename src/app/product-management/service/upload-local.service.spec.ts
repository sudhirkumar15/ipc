import { TestBed, inject } from '@angular/core/testing';

import { UploadLocalService } from './upload-local.service';

describe('UploadLocalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadLocalService]
    });
  });

  it('should be created', inject([UploadLocalService], (service: UploadLocalService) => {
    expect(service).toBeTruthy();
  }));
});
