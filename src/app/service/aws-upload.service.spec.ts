import { TestBed, inject } from '@angular/core/testing';

import { AwsUploadService } from './aws-upload.service';

describe('AwsUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwsUploadService]
    });
  });

  it('should be created', inject([AwsUploadService], (service: AwsUploadService) => {
    expect(service).toBeTruthy();
  }));
});
