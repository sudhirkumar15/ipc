import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TenantData } from '../data/bucket/tenant.bucket';
import { ErrorService } from '../service/error.service';

@Injectable()
export class CoreService {

  constructor(
    private http: Http,
    private tenant: TenantData,
    private errorService: ErrorService
  ) { }
  results;
  get = (url, cb, options = null) => {

    const promise = new Promise((resolve, reject) => {
      this.http.get(url, options)
        .toPromise()
        .then(
        res => { // Success
          this.results = res.json();
          cb(this.results);
          resolve();
        },
        msg => { // Error
          this.errorService.setError(JSON.parse(msg._body).error);
          reject(msg);
        }
        );

    });
  }
  post = (url: string, data, cb, options = null) => {

    const promise = new Promise((resolve, reject) => {
      this.http.post(url, data, options)
        .toPromise()
        .then(
        res => { // Success
          this.results = res.json();
          cb(this.results);
          resolve();
        },
        msg => { // Error
          this.errorService.setError(JSON.parse(msg._body).error);
          reject(msg);
        }
        );

    });
    return promise;

  }

  delete = () => {

    return 'response';
  }
  put = () => {

    return 'response';
  }
  head = () => {

    return 'response';
  }
  trace = () => {

    return 'response';
  }
  patch = () => {

    return 'response';
  }
}
