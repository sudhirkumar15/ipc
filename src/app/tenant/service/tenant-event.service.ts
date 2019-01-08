import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TenantEventService {
  tenantApiEvent = new Subject<any>();
  constructor() { }
}
