import { Component, OnInit } from '@angular/core';
import { SiteApiService } from './service/site-api.service';
import { SiteEventService } from './service/site-event.service';
import { SiteService } from './service/site.service';
import { InstitutionService } from './institution-management/service/institution.service';
import { InstitutionApiService } from './institution-management/service/institution-api.service';
import { InstitutionEventService } from './institution-management/service/institution-event.service';
@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  providers: [SiteApiService, SiteEventService, SiteService, InstitutionService, InstitutionApiService,
    InstitutionEventService]
})
export class SiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
