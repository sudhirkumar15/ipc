import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Global } from '../g';
let _this;
@Injectable()
export class InitService {

  constructor(
    private portal: APIService,
    private global: Global
  ) { _this = this; }
  init(cb) {


    _this.portal.getSiteConfig(function (config) {
      _this.global.config = config.data;

      _this.portal.getLanguageTokes(function (language) {
        _this.global.language = language.data;
        cb(true);
      });
    });

  }
}
