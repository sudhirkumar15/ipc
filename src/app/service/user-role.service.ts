import { Injectable } from '@angular/core';

import { RoleResourseModel } from '@repository/model/role.model';
import { RoleData } from '@repository/bucket/role.bucket';
import { AccessModel } from '@repository/model/access.model';

@Injectable()
export class UserRoleService {
  private _userRoleMap: Map<string, boolean>;
  private _allowedPermissions: Array<RoleResourseModel>;

  constructor(private roleData: RoleData) {
    this._userRoleMap = new Map();
    const permission = window.localStorage.getItem('permission');
    if (permission) {
      this.allowedPermission = JSON.parse(permission);
    }
  }

  set allowedPermission(permissions: any) {
    this._allowedPermissions = permissions;
    this.createPermissionMap();
  }

  private createPermissionMap() {
    for (const group of this._allowedPermissions) {
      const key = [group.code];
      this.createResourcepermission(group.resources, key);
    }
  }

  private createResourcepermission(group: Array<RoleResourseModel>, key: Array<string>): void {
    for (const resource of group) {
      key.push(resource.code);
      this.createOperationPermission(resource.operations, key);
    }
  }

  private createOperationPermission(resource: Array<RoleResourseModel>, key: Array<string>) {
    for (const operation of resource) {
      key.push(operation.code);
      this._userRoleMap.set(key.join('-'), true);
    }
  }

  private elementHasAccess(permission: AccessModel, _this) {
    const mapKey = `${permission.group}-${permission.resource}-${permission.operation}`;
    const isAccess = _this._userRoleMap.has(mapKey);
    return isAccess;
  }

  hasAcccess(userPermissions: Array<AccessModel> | AccessModel): boolean {
    return true;
    /*if (Array.isArray(userPermissions)) {
      return userPermissions.some(x => {
        const mapKey = `${x.group}-${x.resource}-${x.operation}`;
        return this._userRoleMap.has(mapKey);
      });
    } else {
      return this.elementHasAccess(<AccessModel>userPermissions, this);
    }*/
  }
}
