import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiEventService {
  apiSucessResponse = new Subject<any>();
  apiErrorResponse = new Subject<any>();
  constructor() { }

}
