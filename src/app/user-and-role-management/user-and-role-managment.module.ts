import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppFormModule } from '../form/app-form.module';
import { DataTableModule } from '../data-table/data-table.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { UserAndRoleManagementComponent } from './user-and-role-management.component';
import { RoleListingComponent } from './role/role-listing/role-listing.component';
import { UserAndRoleManagementRoutingModule } from './user-and-role-managment-routing.module';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserListingComponent } from './user/user-listing/user-listing.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ControlsModule } from '../controls/controls.module';
import { ModalModule } from 'ngx-bootstrap';
import { UserData } from '../data/bucket/user.bucket';
import { RoleAddComponent } from './role/role-add/role-add.component';
import { RoleDetailsComponent } from './role/role-add/role-details/role-details.component';
import { AssignRightsComponent } from './role/role-add/assign-rights/assign-rights.component';
import { AuthEventService } from 'app/auth/service/auth-event.service';
import { AssignUserToClassroomComponent } from './user/user-listing/assign-user-to-classroom/assign-user-to-classroom.component';
@NgModule(
    {
        declarations: [
            UserAndRoleManagementComponent,
            RoleListingComponent,
            UserComponent,
            UserAddComponent,
            UserListingComponent,
            RoleAddComponent,
            RoleDetailsComponent,
            AssignRightsComponent,
            AssignUserToClassroomComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            UserAndRoleManagementRoutingModule,
            AppFormModule,
            NgxDatatableModule,
            DataTableModule,
            SharedModule,
            BsDropdownModule.forRoot(),
            ModalModule.forRoot(),
            ControlsModule
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [ UserData, AuthEventService]
    }
)
export class UserAndRoleManagmentModule { }
