import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

import { Global } from 'app/g';
import { TableDetailsWindowEventService } from '@shared/service/table-details-window-event.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-upload-right-panel',
  templateUrl: './upload-right-panel.component.html',
  styleUrls: ['./upload-right-panel.component.scss']
})
export class UploadRightPanelComponent implements OnInit, OnDestroy {
  @Input() selectedBatchName;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  modalEvent: Subscription;
  constructor(public global: Global,
    public info: TableDetailsWindowEventService
  ) { }

  ngOnInit() {
    this.modalEvent = this.info.tableDetailsWindowAction.subscribe((event) => this.handleEvent(event));
  }

  ngOnDestroy() {
    this.modalEvent.unsubscribe();
  }
  private handleEvent(data: string) {
    switch (data) {
      case 'show':
        this.staticTabs.tabs[this.info.selectedTabIndex].active = true;
        break;
    }
  }
}
