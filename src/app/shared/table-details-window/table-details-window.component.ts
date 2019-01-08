import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TableDetailsWindowEventService } from '../service/table-details-window-event.service';
import { Global } from '../../g';

@Component({
  selector: 'app-table-details-window',
  templateUrl: './table-details-window.component.html',
  styleUrls: ['./table-details-window.component.scss']
})
export class TableDetailsWindowComponent implements OnInit, OnDestroy {
  /**
   * Window Heading input
   **/
  @Input() heading;

  @Input() batchId;

  tableDetailsWindowEventSubscription: Subscription;

  @ViewChild('detailsWindow') detailsWindow: ModalDirective;

  constructor(private tableDetailsWindowEvent: TableDetailsWindowEventService, public global: Global) { }

  ngOnInit() {
    this.tableDetailsWindowEventSubscription = this.tableDetailsWindowEvent.tableDetailsWindowAction.subscribe(event =>
      this.handleTableDetailsWindowAction(event));
  }

  ngOnDestroy() {
    this.tableDetailsWindowEventSubscription.unsubscribe();
  }

  private handleTableDetailsWindowAction(action: string) {
    switch (action) {
      case 'show':
        this.detailsWindow.show();
        break;
    }
  }
}
