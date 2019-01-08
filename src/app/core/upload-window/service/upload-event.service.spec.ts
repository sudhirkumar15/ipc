import { TestBed, inject } from '@angular/core/testing';

import { UploadEventService } from './upload-event.service';
import { HttpClientModule } from '@angular/common/http';

describe('UploadEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [UploadEventService]
    });
  });

  it('should be created', inject([UploadEventService], (service: UploadEventService) => {
    expect(service).toBeTruthy();
  }));
});
