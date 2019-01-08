import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown/bs-dropdown.module';
import { ProductManagementComponent } from './product-management.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUploadHistoryComponent } from './product-upload-history/product-upload-history.component';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DataTableModule } from '../data-table/data-table.module';
import { AppFormModule } from '../form/app-form.module';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { AssetsComponent } from './assets/assets.component';
import { AssetListComponent } from './assets/asset-list/asset-list.component';
import { UploadHistoryApiService } from './service/upload-history-api.service';
import { AssetsApiService } from './service/assets-api.service';
import { AssetsApiEventService } from '@products/service/assets-api-event.service';
import { ProductCreateComponent } from './product-create/product-create.component';
import { CurriculumCreationComponent } from './product-create/curriculum-creation/curriculum-creation.component';
import { CourseCreationComponent } from './product-create/course-creation/course-creation.component';
import { CurriculumCreatorComponent } from './product-create/curriculum-creation/curriculum-creator/curriculum-creator.component';
import { CurriculumSettingsComponent } from './product-create/curriculum-creation/curriculum-settings/curriculum-settings.component';
import { ManageAssetsComponent } from './product-create/course-creation/manage-assets/manage-assets.component';
import { ProductDetailsComponent } from './product-create/course-creation/product-details/product-details.component';
import { SettingsPublishComponent } from './product-create/course-creation/settings-publish/settings-publish.component';
import { AccordionModule } from 'ngx-bootstrap';
import { SortableModule } from 'ngx-bootstrap';
import { AssetDeleteComponent } from './assets/asset-list/asset-delete/asset-delete.component';
import { AssetLinkComponent } from './assets/asset-list/asset-link/asset-link.component';
import { AssetReplaceComponent } from './assets/asset-list/asset-replace/asset-replace.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { ProductUploadLocalComponent } from './product-upload/product-upload-local/product-upload-local.component';
import { UploadRightPanelComponent } from './product-upload-history/upload-right-panel/upload-right-panel.component';
import { TabAssetInfoComponent } from './product-upload-history/upload-right-panel/tab-asset-info/tab-asset-info.component';
import { TabUploadInfoComponent } from './product-upload-history/upload-right-panel/tab-upload-info/tab-upload-info.component';
import {
  ProductUploadLocalStartComponent
} from '@products/product-upload/product-upload-local/product-upload-local-start/product-upload-local-start.component';
import {
  ProductUploadLocalStatusComponent
} from '@products/product-upload/\product-upload-local/product-upload-local-status/product-upload-local-status.component';
import { TabProductsComponent } from './assets/asset-list/asset-link/tab-products/tab-products.component';
import { TabLinkComponent } from './assets/asset-list/asset-link/tab-link/tab-link.component';
import { ProductTypeData } from '@repository/bucket/product-type.bucket';
import { UploadAssetsComponent } from './product-create/upload-assets/upload-assets.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductManagementRoutingModule,
    AppFormModule,
    NgxDatatableModule,
    DataTableModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    SortableModule.forRoot()
  ],
  providers: [
    ProductTypeData,
    AssetsApiService,
    AssetsApiEventService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ProductManagementComponent,
    ProductListComponent,
    ProductUploadHistoryComponent,
    AssetsComponent,
    AssetListComponent,
    AssetDeleteComponent,
    AssetLinkComponent,
    AssetReplaceComponent,
    ProductUploadComponent,
    ProductUploadLocalComponent,
    UploadRightPanelComponent,
    TabAssetInfoComponent,
    TabUploadInfoComponent,
    ProductUploadLocalStatusComponent,
    ProductUploadLocalStartComponent,
    TabProductsComponent,
    TabLinkComponent,
    ProductCreateComponent,
    CurriculumCreationComponent,
    CourseCreationComponent,
    CurriculumCreatorComponent,
    CurriculumSettingsComponent,
    ManageAssetsComponent,
    ProductDetailsComponent,
    SettingsPublishComponent,
    UploadAssetsComponent
  ]
})
export class ProductManagementModule { }
