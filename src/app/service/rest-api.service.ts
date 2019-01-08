import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Rest } from './rest';
import { ErrorService } from './error.service';

@Injectable()
export class RestApiService implements Rest {
  constructor(protected httpClient?: HttpClient, protected router?: Router, protected errorService?: ErrorService) { }

  handleRestError(err: HttpErrorResponse) {
    this.handleGlobalError(err);
    this.errorService.setError(err);
  }

  handleGlobalError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.router.navigate(['/login']);
    }
  }
  get(url: string, params: any, headers?: any) {
    return this.httpClient.get(url, {
      headers: headers,
      params: params
    });
  }
  post(url, data, headers?: any) {
    return this.httpClient.post(url, data, {
      headers: headers,
    });
  }
  patch(url, data, headers?: any) {
    return this.httpClient.patch(url, data, {
      headers: headers,
    });
  }
}
