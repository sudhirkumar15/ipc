import { Component, OnInit } from '@angular/core';
import { TenantEventService } from './service/tenant-event.service';
import { TenantApiService } from './service/tenant-api.service';
import { TenantService } from './service/tenant.service';
@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
  providers: [TenantEventService, TenantApiService, TenantService]
})
export class TenantComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}
