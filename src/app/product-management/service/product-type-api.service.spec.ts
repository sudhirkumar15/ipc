import { TestBed, inject } from '@angular/core/testing';

import { ProductTypeApiService } from './product-type-api.service';

describe('ProductTypeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductTypeApiService]
    });
  });

  it('should be created', inject([ProductTypeApiService], (service: ProductTypeApiService) => {
    expect(service).toBeTruthy();
  }));
});
