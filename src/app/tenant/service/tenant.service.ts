import { Injectable } from '@angular/core';
@Injectable()
export class TenantService {
  private _tenantListDataLoader: boolean;
  constructor() {
    this._tenantListDataLoader = true;
   }
  get tenantListDataLoader(): boolean {
    return this._tenantListDataLoader;
  }
  set tenantListDataLoader(tenantListDataLoader: boolean) {
    this._tenantListDataLoader = tenantListDataLoader;
  }
}
