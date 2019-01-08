import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Util } from 'app/util';
import { Global } from 'app/g';
import { TenantData } from '@repository/bucket/tenant.bucket';
import { TenantEventService } from '@tenants/service/tenant-event.service';

@Component({
  selector: 'app-tenant-add',
  templateUrl: './tenant-add.component.html',
  styleUrls: ['./tenant-add.component.scss']
})
export class TenantAddComponent implements OnInit, OnDestroy {
  tenantApiEventSucessSubscription: Subscription;
  constructor(public global: Global,
    public tenantData: TenantData,
    private tenantEvent: TenantEventService
  ) { }

  ngOnInit() {
    this.tenantData.activeTabName = 'tenantdetails';
    this.tenantApiEventSucessSubscription = this.tenantEvent.tenantApiEvent.subscribe(
      (event) => {
        this.handleEvent(event);
      }
    );
  }

  ngOnDestroy() {
    this.tenantApiEventSucessSubscription.unsubscribe();
  }

  private handleEvent(event: string) {
    event = event.toLowerCase();
    switch (event) {
      case 'tenantadmin':
        this.tenantData.activeTabName = 'tenantadmin';
        break;
      case 'tenantdetails':
        this.tenantData.activeTabName = 'tenantdetails';
        break;
    }
  }
}
