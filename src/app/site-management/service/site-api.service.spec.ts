import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { SiteApiService } from './site-api.service';
import { ErrorService } from '../../service/error.service';
import { Global } from '../../g';
import { SiteData } from '../../data/bucket/site.bucket';
import { SiteEventService } from './site-event.service';
import { SiteService } from './site.service';

describe('SiteApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        SiteApiService,
        ErrorService,
        {
          provide: Global, useValue: {
            config: {
              siteKey: 'login',
            },
            language: {
              signUp: 'signUp',
            }
          }
        },
        SiteData,
        SiteEventService,
        SiteService
      ]
    });
  });

  it('should be created', inject([SiteApiService], (service: SiteApiService) => {
    expect(service).toBeTruthy();
  }));
});
