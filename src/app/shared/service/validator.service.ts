import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { RestApiService } from '@services/rest-api.service';
import { ErrorService } from '@services/error.service';
import { Global } from 'app/g';

@Injectable()
export class ValidatorService extends RestApiService {

  constructor(http: HttpClient, router: Router, errorService: ErrorService, private global: Global) {
    super(http, router, errorService);
  }

  isExists(resource, field, value) {
    const params = {
      resource: resource,
      field: field,
      value: value
    };
    const validateApiUrl = this.global.config['domain'] +
      this.global.config['apipath'] + 'validators';
    return this.post(validateApiUrl, {validators: [params]});
  }
}
