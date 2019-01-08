import { TestBed, inject } from '@angular/core/testing';

import { RestApiService } from './rest-api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from './error.service';
import { Global } from '../g';

describe('RestApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [RestApiService,
      ErrorService,
      Global
      ]
    });
  });

  it('should be created', inject([RestApiService], (service: RestApiService) => {
    expect(service).toBeTruthy();
  }));
});
