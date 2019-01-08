import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthEventService {
  _authEvent = new Subject<string>();
  get authEvent () {
    return this._authEvent;
  }
  constructor() { }

}
