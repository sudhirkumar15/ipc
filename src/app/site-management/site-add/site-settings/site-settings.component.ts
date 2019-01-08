import { Component, OnInit } from '@angular/core';
import { Global } from '../../../g';
import { SiteEventService } from '../../service/site-event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-add-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.scss']
})
export class SiteSettingsComponent implements OnInit {

  constructor(public global: Global,
    private siteEvent: SiteEventService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  backToSiteAdmin() {
    this.siteEvent.siteApiEvent.next('siteadmin');
  }
  newSiteCreated() {
    this.router.navigate(['/sites']);
    this.global.apiSuccess = this.global.language.newSiteCreated;
  }

}
