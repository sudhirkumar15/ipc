import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AccessDeniedComponent } from '@core/access-denied/access-denied.component';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'tenants',
        loadChildren: './tenant/tenants.module#TenantsModule',
    },
    {
        path: 'roles',
        loadChildren: './user-and-role-management/user-and-role-managment.module#UserAndRoleManagmentModule',
    },
    {
        path: 'sites',
        loadChildren: './site-management/sites-management.module#SitesManagementModule',
    },
    {
        path: 'products',
        loadChildren: './product-management/product-management.module#ProductManagementModule',
    },
    {
        path: 'noaccess',
        component: AccessDeniedComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
