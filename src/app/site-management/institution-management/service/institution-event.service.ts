import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class InstitutionEventService {
    institutionApiEvent = new Subject<any>();
    constructor() { }
}
