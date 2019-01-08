import { Component, OnInit } from '@angular/core';
import { RoleApiService } from './role/service/role-api.service';
import { UserApiService } from './user/service/user-api.service';
import { UserService } from './user/service/user.service';
import { RoleEventService } from './role/service/role-event.service';
import { RoleService } from './role/service/role.service';
@Component({
  selector: 'app-user-and-role-management',
  templateUrl: './user-and-role-management.component.html',
  styleUrls: ['./user-and-role-management.component.scss'],
  providers: [RoleApiService, UserApiService, UserService, RoleEventService, RoleService]
})
export class UserAndRoleManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
