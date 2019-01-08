import { TestBed, inject } from '@angular/core/testing';

import { CommonService } from './common.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonData } from '../data/bucket/countries.bucket';
import { ErrorService } from './error.service';
import { Global } from '../g';

describe('CommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [CommonService, CommonData, ErrorService,
      Global
      ]
    });
  });

  it('should be created', inject([CommonService], (service: CommonService) => {
    expect(service).toBeTruthy();
  }));
});
