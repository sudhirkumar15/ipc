import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantComponent } from './tenant.component';
import { AuthGuardService } from '../service/auth-guard.service';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantAddComponent } from './tenant-add/tenant-add.component';
import { AccessNameService } from '@services/access-name.service';


const tenantsRoutes: Routes = [
    {
        path: '',
        component: TenantComponent,
        canActivate: [AuthGuardService],
        data: { accessRules: AccessNameService.tenantCreationAccess },
        children: [
            {
                path: '',
                component: TenantListComponent,
                data: { accessRules: AccessNameService.tenantCreationAccess },
            },
            {
                path: 'add',
                component: TenantAddComponent,
                data: { accessRules: AccessNameService.tenantCreationAccess },
            }
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(tenantsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class TenantsRoutingModule { }

