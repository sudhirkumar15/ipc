import { Component, OnInit } from '@angular/core';
import { Global } from '../../../../g';
import { InstitutionData } from './../../../../data/bucket/institution.bucket';
import { InstitutionEventService } from '../../service/institution-event.service';
import { Util } from '../../../../util';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-institution-add-settings',
  templateUrl: './institution-settings.component.html',
  styleUrls: ['./institution-settings.component.scss']
})
export class InstitutionSettingsComponent implements OnInit {
  siteId: number;
  constructor(public global: Global,
    private institutionEvent: InstitutionEventService,
    private InstitutionData: InstitutionData,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.siteId = +params['siteId'];
    });
  }
  backToInstitutionAdmin() {
    this.institutionEvent.institutionApiEvent.next('institutionadmin');
  }
  newInstitutionCreated() {
    this.router.navigate(['/sites', this.siteId, 'institutions']);
    this.global.apiSuccess = this.global.language.newInstitutionCreated;
  }
}
