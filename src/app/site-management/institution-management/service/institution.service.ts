import { Injectable } from '@angular/core';
@Injectable()
export class InstitutionService {
  private _institutionListDataLoader: boolean;
  constructor() {
    this._institutionListDataLoader = true;
   }

  get institutionListDataLoader(): boolean {
    return this._institutionListDataLoader;
  }
  set institutionListDataLoader(institutionListDataLoader: boolean) {
    this._institutionListDataLoader = institutionListDataLoader;
  }
}
