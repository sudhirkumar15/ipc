import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AssetsApiEventService {
 apiEvent = new Subject<any>();
 constructor() { }
}
