import { TestBed, inject } from '@angular/core/testing';

import { AssetsApiService } from './assets-api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from '../../service/error.service';
import { Global } from '../../g';
import { ProductData } from '../../data/bucket/product.bucket';

describe('AssetsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [AssetsApiService, ErrorService, Global,
      ProductData
      ]
    });
  });

  it('should be created', inject([AssetsApiService], (service: AssetsApiService) => {
    expect(service).toBeTruthy();
  }));
});
