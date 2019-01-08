import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const authsRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(authsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }
