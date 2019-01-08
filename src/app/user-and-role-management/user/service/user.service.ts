import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class UserService {
  private _userListDataLoader: boolean;
  userEvent = new Subject<any>();
  constructor() {
    this._userListDataLoader = true;
   }

  get userListDataLoader(): boolean {
    return this._userListDataLoader;
  }
  set userListDataLoader(userListDataLoader: boolean) {
    this._userListDataLoader = userListDataLoader;
  }
}
