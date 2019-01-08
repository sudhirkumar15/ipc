import { TestBed, inject } from '@angular/core/testing';

import { UploadHistoryApiService } from './upload-history-api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from '../../service/error.service';
import { Global } from '../../g';
import { ProductData } from '../../data/bucket/product.bucket';

describe('Upload History Api Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [UploadHistoryApiService, ErrorService,
        Global,
        ProductData
      ]
    });
  });

  it('should be created', inject([UploadHistoryApiService], (service: UploadHistoryApiService) => {
    expect(service).toBeTruthy();
  }));
});
