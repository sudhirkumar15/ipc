import { Injectable } from '@angular/core';
import { CoreService } from '../service/core.service';
import { Global } from '../g';
import { Headers, RequestOptions } from '@angular/http';
import { environment } from '@environments/environment';

let _this;
@Injectable()
export class APIService {
  constructor(
    private rest: CoreService,
    private global: Global
  ) { _this = this; }
  response;

  getLanguageTokes(cb) {
    _this.rest.get('assets/languages/' + environment.language, cb, null);
  }

  getSiteConfig(cb) {
    _this.rest.get(_this.global.siteConfigURL, cb, null);
  }

  recaptcha(response, cb) {
    _this.rest.get(_this.global.captchaURL + response, cb);
  }

}
