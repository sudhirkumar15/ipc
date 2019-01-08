import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Global } from '../../../../g';
import { RoleData } from '../../../../data/bucket/role.bucket';
import { RoleResourceAPIResponseModel } from '../../../../data/model/role.model';
import { RoleApiService } from '../../service/role-api.service';
import { Subscription } from 'rxjs/Subscription';
import { RoleEventService } from '../../service/role-event.service';
@Component({
  selector: 'app-role-add-assign-rights',
  templateUrl: './assign-rights.component.html',
  styleUrls: ['./assign-rights.component.scss']
})
export class AssignRightsComponent implements OnInit, OnDestroy {
  assignRightsForm: FormGroup;
  apiResponseSubscription: Subscription;
  constructor(public global: Global,
    public roleData: RoleData,
    private roleApi: RoleApiService,
    private roleEvent: RoleEventService,
    private router: Router) { }

  ngOnInit() {
    this.initModel();
    this.roleApi.getResourceGroups();
    this.apiResponseSubscription = this.roleEvent.roleApiEvent.subscribe(
      (data) => {
        this.handleApiEvent(data);
      }
    );
  }

  initModel() {
    const responseModel: RoleResourceAPIResponseModel | any = {};
    responseModel.data = { resourceGroups: [] };
    this.roleData.RoleResourcePostData.value = responseModel;
  }

  ngOnDestroy() {
    this.apiResponseSubscription.unsubscribe();
  }

  private handleApiEvent(data: string) {
    switch (data) {
      case 'resourcegroup': this.getResourceApiData();
        break;
      case 'rolepermission':
        this.global.apiSuccess = this.global.language.newRoleAdded;
        this.router.navigate(['/roles']);
        break;
      case 'resourceapierror': console.log('error');
        break;
    }
  }

  backToRoleDetails() {
    this.roleEvent.roleApiEvent.next('roledetails');
  }

  getResourceApiData() {
    this.roleData.RoleResourcePostData.value.data.resourceGroups.map((resourceGroupItem, index) => {
      resourceGroupItem['isChecked'] = false;
      this.roleData.RoleResourcePostData.value.data.resourceGroups[index]['resources'].map((resources, ind) => {
        resources.isChecked = false;
        this.roleData.RoleResourcePostData.value.data.resourceGroups[index]['resources'][ind].operations.map((operationItem) => {
          operationItem.isChecked = false;
        });
      });
    });
  }

  toggleResourceList(resourceGroup: Object) {
    if (!resourceGroup['isOpen']) {
      this.roleData.RoleResourcePostData.value['data']['resourceGroups'].map((resourceGroupItem) => {
        resourceGroupItem['isOpen'] = false;
      });
    }
    resourceGroup['isOpen'] = !resourceGroup['isOpen'];
  }

  toggleOperationList(resource: Object, index: number) {
    if (!resource['isOpen']) {
      this.roleData.RoleResourcePostData.value['data']['resourceGroups'][index]['resources'].map((resourceItem) => {
        resourceItem.isOpen = false;
      });
    }
    resource['isOpen'] = !resource['isOpen'];
  }

  // first Level
  firstLevel(resourceGroup: Object) {
    resourceGroup['resources'].map((resourceItem, ind) => {
      resourceItem.isChecked = resourceGroup['isChecked'];
      const itemchild = resourceGroup['resources'][ind].operations;
      this.selectionordeselection(itemchild, resourceGroup['isChecked']);
    });
  }

  childLevel(resourceGroup: Object, resource: Object, operations: object = null) {
    if (operations == null) {
      this.selectionordeselection(resource['operations'], resource['isChecked']);
    } else {
      resource['isChecked'] = this.selectioncheck(resource['operations']);
    }
    resourceGroup['isChecked'] = this.selectioncheck(resourceGroup['resources']);
  }

  selectionordeselection(items: any, value: boolean) {
    items.map((operationItem) => {
      operationItem.isChecked = value;
    });
  }

  selectioncheck(resource: any): boolean {
    let checkedFlag = false;
    resource.map((operationItem) => {
      if (operationItem.isChecked) {
        checkedFlag = true;
      }
    });
    return checkedFlag;
  }

  createPermission() {
    const resourceGroups = this.roleData.RoleResourcePostData.value['data']['resourceGroups'].
      filter(resourceGroup => resourceGroup.isChecked);
    const resourceList = resourceGroups.map(
      (group) => {
        const temp = group['resources'].filter(
          (resource) => {
            return resource.isChecked;
          }
        );
        if (temp.length > 0) {
          return temp[0];
        }
      }
    );
    resourceList.forEach((resource, index) => {
      const operations = resource.operations.filter(op => op.isChecked);
      resourceList[index].operations = operations.map(op => op.code);

    });
    const postData: any = {};
    postData.permission = {};
    postData.permission.resources = resourceList;
    postData.permission.role = {};
    postData.permission.role.id = this.roleData.AddNewRolePostData.value['data'].role.id;
    postData.permission.role.code = this.roleData.AddNewRolePostData.value['data'].role.code;
    postData.permission.role.name = this.roleData.AddNewRolePostData.value['data'].role.name;
    this.roleApi.createPermission(postData);
  }

}
