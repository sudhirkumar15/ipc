import { Injectable } from '@angular/core';
@Injectable()
export class SiteService {
  private _siteListDataLoader: boolean;
  constructor() {
    this._siteListDataLoader = true;
   }

  get siteListDataLoader(): boolean {
    return this._siteListDataLoader;
  }
  set siteListDataLoader(siteListDataLoader: boolean) {
    this._siteListDataLoader = siteListDataLoader;
  }
}
