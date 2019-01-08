import { Injectable } from '@angular/core';
@Injectable()
export class ProductService {
  private _productListDataLoader: boolean;
  constructor() {
    this._productListDataLoader = true;
   }

  get productListDataLoader(): boolean {
    return this._productListDataLoader;
  }
  set productListDataLoader(productListDataLoader: boolean) {
    this._productListDataLoader = productListDataLoader;
  }
}
