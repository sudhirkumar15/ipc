import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site.component';
import { AuthGuardService } from '../service/auth-guard.service';
import { SiteListingComponent } from './site-listing/site-listing.component';
import { SiteAddComponent } from './site-add/site-add.component';
import {
    InstitutionListingComponent
} from './../site-management/institution-management/institution-listing/institution-listing.component';
import {
    InstitutionAddComponent
} from './../site-management/institution-management/institution-add/institution-add.component';
const sitesRoutes: Routes = [
    {
        path: '',
        component: SiteComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: '', component: SiteListingComponent },
            { path: 'add', component: SiteAddComponent },
            { path: ':siteId/institutions', component: InstitutionListingComponent },
            { path: ':siteId/institutions/add', component: InstitutionAddComponent }
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(sitesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SitesManagementRoutingModule { }
