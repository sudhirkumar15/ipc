import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Global } from '../../../g';
import { RoleData } from '../../../data/bucket/role.bucket';
import { RoleEventService } from '../service/role-event.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit, OnDestroy {
  roleApiEventSucessSubscription: Subscription;
  constructor(public global: Global,
    public roleData: RoleData,
    private roleEvent: RoleEventService
  ) { }

  ngOnInit() {
    this.roleData.AddNewRolePostData.activeTabName = 'roledetails';
    this.roleApiEventSucessSubscription = this.roleEvent.roleApiEvent.subscribe(
      (event) => {
        this.handleEvent(event);
      }
    );
  }

  ngOnDestroy() {
    this.roleApiEventSucessSubscription.unsubscribe();
  }

  private handleEvent(event: string) {
    event = event.toLowerCase();
    switch (event) {
      case 'roledetails':
        this.roleData.AddNewRolePostData.activeTabName = 'roledetails';
        break;
      case 'assignrights':
        this.roleData.AddNewRolePostData.activeTabName = 'assignrights';
        break;
    }
  }

}
