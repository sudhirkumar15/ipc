import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantComponent } from './tenant.component';
import { CommonModule } from '@angular/common';
import { TenantsRoutingModule } from './tenants-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppFormModule } from '../form/app-form.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from '../data-table/data-table.module';
import { SharedModule } from '../shared/shared.module';
import { ControlsModule } from '../controls/controls.module';
import { TenantAddComponent } from './tenant-add/tenant-add.component';
import { TenantDetailsComponent } from './tenant-add/tenant-details/tenant-details.component';
import { TenantAdminComponent } from './tenant-add/tenant-admin/tenant-admin.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
    declarations: [
        TenantListComponent,
        TenantComponent,
        TenantAddComponent,
        TenantDetailsComponent,
        TenantAdminComponent
    ],
    imports: [
        CommonModule,
        TenantsRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppFormModule,
        NgxDatatableModule,
        DataTableModule,
        SharedModule,
        ControlsModule,
        BsDropdownModule.forRoot()
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TenantsModule { }
