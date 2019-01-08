import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/';
import { Router } from '@angular/router/';

import { RestApiService } from '@services/rest-api.service';
import { ErrorService } from '@services/error.service';

@Injectable()
export class UploadLocalService extends RestApiService {

  constructor(
    http: HttpClient,
    router: Router,
    errorService: ErrorService,
  ) {
    super(http, router, errorService);
  }

}
