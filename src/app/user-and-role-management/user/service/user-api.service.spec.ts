import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { UserApiService } from './user-api.service';
import { ErrorService } from '../../../service/error.service';
import { Global } from '../../../g';
import { UserData } from '../../../data/bucket/user.bucket';
import { UserService } from './user.service';

describe('UserApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [UserApiService,
        ErrorService,
        Global,
        UserData,
        UserService
      ]
    });
  });

  it('should be created', inject([UserApiService], (service: UserApiService) => {
    expect(service).toBeTruthy();
  }));
});
