import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Util } from '../../util';
import { Global } from '../../g';
import { SiteData } from '../../data/bucket/site.bucket';
import { SiteModel } from '../../data/model/site.model';
import { APIService } from '../../service/api.service';
import { SiteEventService } from '../service/site-event.service';
import { Subscription } from 'rxjs/Subscription';

let _this;
@Component({
    selector: 'app-site-add',
    templateUrl: './site-add.component.html',
    styleUrls: ['./site-add.component.scss']
})

export class SiteAddComponent implements OnInit, OnDestroy {
    siteApiEventSucessSubscription: Subscription;
    constructor(public global: Global,
        public siteData: SiteData,
        private siteEvent: SiteEventService

    ) { _this = this; }

    ngOnInit() {
        this.siteData.AddNewSitePostData.activeTabName = 'siteinfo';
        this.siteApiEventSucessSubscription = this.siteEvent.siteApiEvent.subscribe(
            (event) => {
                this.handleEvent(event);
            }
        );
    }

    ngOnDestroy() {
        this.siteApiEventSucessSubscription.unsubscribe();
    }
    private handleEvent(event: string) {
        event = event.toLowerCase();
        switch (event) {
            case 'siteadmin':
                this.siteData.AddNewSitePostData.activeTabName = 'siteadmin';
                break;
            case 'siteinfo':
                this.siteData.AddNewSitePostData.activeTabName = 'siteinfo';
                break;
            case 'sitesettings':
                this.siteData.AddNewSitePostData.activeTabName = 'sitesettings';
                break;
        }
    }
}

