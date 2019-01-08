import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { APIService } from '../service/api.service';
import { ApiEventService } from '../service/api-event.service';
import { AuthService } from '../service/auth.service';
import { AuthGuardService } from '../service/auth-guard.service';
import { CommonService } from '../service/common.service';
import { CommonData } from '../data/bucket/countries.bucket';
import { CoreService } from '../service/core.service';
import { DropDownModel } from '../data/model/dropdown.model';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { ErrorService } from '../service/error.service';
import { Global } from '../g';
import { JwtHelperService } from '../service/jwt-helper.service';
import { SuccessHandlerComponent } from './success-handler/success-handler.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { RestApiService } from '../service/rest-api.service';
import { InitService } from '../service/init.service';
import { TenantData } from '../data/bucket/tenant.bucket';
import { RoleData } from '../data/bucket/role.bucket';
import { Util } from '../util';
import { SiteData } from '../data/bucket/site.bucket';
import { LoginUser } from '../data/bucket/login-user.bucket';
import { LoginUserModel, LoginModel, LoginResponseModel } from '../data/model/login-user.model';
import { ProductData } from '../data/bucket/product.bucket';
import { UploadComponent } from './upload-window/upload//upload.component';
import { UploadStatusComponent } from './upload-window/upload/upload-status/upload-status.component';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { UploadEventService } from './upload-window/service/upload-event.service';
import { UploadWindowComponent } from './upload-window/upload-window.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoleService } from '@services/user-role.service';
import { AccessNameService } from '@services/access-name.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
@NgModule({
    entryComponents: [UploadStatusComponent],
    declarations: [
        SuccessHandlerComponent,
        ErrorHandlerComponent,
        SidePanelComponent,
        UploadComponent,
        UploadStatusComponent,
        UploadWindowComponent,
        AccessDeniedComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ModalModule.forRoot(),
        TabsModule.forRoot()
    ],
    exports: [
        CommonModule,
        SuccessHandlerComponent,
        ErrorHandlerComponent,
        SidePanelComponent,
        UploadWindowComponent,
        UploadComponent,
        UploadStatusComponent
    ],
    providers: [
        APIService,
        RestApiService,
        InitService,
        CoreService,
        TenantData,
        RoleData,
        Global,
        Util,
        LoginModel,
        ErrorService,
        SiteData,
        AuthService,
        AuthGuardService,
        JwtHelperService,
        CommonService,
        CommonData,
        LoginUser,
        SiteData,
        ProductData,
        ApiEventService,
        LoginUserModel,
        UploadEventService,
        DropDownModel,
        UserRoleService
    ]
})
export class CoreModule { }
