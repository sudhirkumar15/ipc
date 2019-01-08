import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../service/auth-guard.service';
import { UserAndRoleManagementComponent } from './user-and-role-management.component';
import { RoleListingComponent } from './role/role-listing/role-listing.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserListingComponent } from './user/user-listing/user-listing.component';
import { RoleAddComponent } from './role/role-add/role-add.component';
import { AccessNameService } from '@services/access-name.service';
const userRoleRoutes: Routes = [
    {
        path: '',
        component: UserAndRoleManagementComponent,
        canActivate: [AuthGuardService],
        data: AccessNameService.userRoleAccess,
        children: [
            { path: '', component: RoleListingComponent,
            canActivate: [AuthGuardService],
            data: {accessRules: AccessNameService.userRoleAccess},
        },
            { path: 'add', component: RoleAddComponent },
            { path: 'users/add', component: UserAddComponent },
            { path: 'users', component: UserListingComponent}
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(userRoleRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserAndRoleManagementRoutingModule { }
