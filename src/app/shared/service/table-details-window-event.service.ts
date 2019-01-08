import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TableDetailsWindowEventService {
  selectedRow: any;
  selectedTabIndex: number;
  tableDetailsWindowAction = new Subject<string>();
  constructor() {
    this.selectedTabIndex = 0;
  }

}
