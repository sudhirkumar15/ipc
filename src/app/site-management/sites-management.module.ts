import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SiteComponent } from './site.component';
import { SiteAddComponent } from './site-add/site-add.component';
import { SiteInfoComponent } from './site-add/site-info/site-info.component';
import { SiteAdminComponent } from './site-add/site-admin/site-admin.component';
import { SiteSettingsComponent } from './site-add/site-settings/site-settings.component';
import { SiteListingComponent } from './site-listing/site-listing.component';
import { AppFormModule } from '../form/app-form.module';
import { DataTableModule } from '../data-table/data-table.module';
import { SharedModule } from '../shared/shared.module';
import { SitesManagementRoutingModule } from './sites-management-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown/bs-dropdown.module';
import {
  InstitutionAddComponent
} from './institution-management/institution-add/institution-add.component';
import {
  InstitutionInfoComponent
} from './institution-management/institution-add/institution-info/institution-info.component';
import {
  InstitutionAdminComponent
} from './institution-management/institution-add/institution-admin/institution-admin.component';
import {
  InstitutionSettingsComponent
} from './institution-management/institution-add/institution-settings/institution-settings.component';
import {
  InstitutionListingComponent
} from './institution-management/institution-listing/institution-listing.component';
import { InstitutionData } from './../data/bucket/institution.bucket';
import { ControlsModule } from '../controls/controls.module';
@NgModule(
    {
        declarations: [
            SiteComponent,
            SiteAddComponent,
            SiteInfoComponent,
            SiteAdminComponent,
            SiteSettingsComponent,
            SiteListingComponent,
            InstitutionAddComponent,
            InstitutionInfoComponent,
            InstitutionAdminComponent,
            InstitutionSettingsComponent,
            InstitutionListingComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            SitesManagementRoutingModule,
            BsDropdownModule.forRoot(),
            AppFormModule,
            NgxDatatableModule,
            DataTableModule,
            SharedModule,
            BsDropdownModule.forRoot(),
            ControlsModule

        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          InstitutionData
        ],
    }
  )
export class SitesManagementModule { }
