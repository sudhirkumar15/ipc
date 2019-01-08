import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../service/auth-guard.service';
import { ProductManagementComponent } from './product-management.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUploadHistoryComponent } from './product-upload-history/product-upload-history.component';
import { AssetsComponent } from './assets/assets.component';
import { AssetListComponent } from './assets/asset-list/asset-list.component';
import { CourseCreationComponent } from './product-create/course-creation/course-creation.component';
import { CurriculumCreationComponent } from './product-create/curriculum-creation/curriculum-creation.component';
const productRoutes: Routes = [
    {
        path: '',
        component: ProductManagementComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: '', component: ProductListComponent },
            { path: 'upload/history', component: ProductUploadHistoryComponent },
            {
                path: 'assets', component: AssetsComponent,
                children: [
                    {
                        path: '', component: AssetListComponent,
                    }
                ]
            },
            { path: 'course/create', component: CourseCreationComponent },
            { path: 'curriculum/create', component: CurriculumCreationComponent },
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(productRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProductManagementRoutingModule { }
