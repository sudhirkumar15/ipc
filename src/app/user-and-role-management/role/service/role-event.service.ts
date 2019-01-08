import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RoleEventService {
    roleApiEvent = new Subject<any>();
    constructor() { }
}
