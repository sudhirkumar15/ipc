import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { UploadApiService } from './upload-api.service';
import { ErrorService } from '../../../service/error.service';
import { Global } from '../../../g';
import { ProductData } from '../../../data/bucket/product.bucket';
import { UploadEventService } from './upload-event.service';

describe('UploadApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        UploadApiService,
        ErrorService,
        Global,
        ProductData,
        UploadEventService
      ]
    });
  });

  it('should be created', inject([UploadApiService], (service: UploadApiService) => {
    expect(service).toBeTruthy();
  }));
});
