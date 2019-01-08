import { Injectable } from '@angular/core';
import { AccessModel } from '@repository/model/access.model';

@Injectable()
export class AccessNameService {
  static tenantCreationAccess: AccessModel = { group: 'tenant_management', resource: 'register', operation: 'create' };
  static roleCreationAccess: AccessModel = { group: 'role_management', resource: 'role', operation: 'create' };
  static roleViewAccess: AccessModel = { group: 'role_management', resource: 'role', operation: 'view' };
  static userRoleAccess: Array<AccessModel> = [
    AccessNameService.roleCreationAccess,
    AccessNameService.roleViewAccess,
  ];
  constructor() { }
}
