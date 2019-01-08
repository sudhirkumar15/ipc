import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Util } from '../../../util';
import { Global } from '../../../g';
import { InstitutionData } from './../../../data/bucket/institution.bucket';
import { InstitutionEventService } from '../service/institution-event.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-institution-add',
  templateUrl: './institution-add.component.html',
  styleUrls: ['./institution-add.component.scss'],
})
export class InstitutionAddComponent implements OnInit, OnDestroy {
  institutionApiEventSuccessSubscription: Subscription;
  constructor(public global: Global,
    public institutionData: InstitutionData,
    private institutionEvent: InstitutionEventService) { }

  ngOnInit() {
    this.institutionData.AddNewInstitutiontData.activeTabName = 'institutioninfo';
    this.institutionApiEventSuccessSubscription = this.institutionEvent.institutionApiEvent.subscribe(
      (event) => {
        this.handleEvent(event);
      }
    );
  }
  ngOnDestroy() {
    this.institutionApiEventSuccessSubscription.unsubscribe();
  }
  private handleEvent(event: string) {
    event = event.toLowerCase();
    switch (event) {
      case 'institutioninfo':
        this.institutionData.AddNewInstitutiontData.activeTabName = 'institutioninfo';
        break;
      case 'institutionadmin':
        this.institutionData.AddNewInstitutiontData.activeTabName = 'institutionadmin';
        break;
      case 'institutionsettings':
        this.institutionData.AddNewInstitutiontData.activeTabName = 'institutionsettings';
        break;
    }
  }
}
