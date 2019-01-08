import { TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { ErrorHandlerComponent } from './core/error-handler/error-handler.component';
import { SuccessHandlerComponent } from './core/success-handler/success-handler.component';
import { UploadWindowComponent } from './core/upload-window/upload-window.component';
import { SidePanelComponent } from './core/side-panel/side-panel.component';
import { UploadComponent } from './core/upload-window/upload/upload.component';
import { TimeRemianingPipe } from './shared/pipes/time-remianing.pipe';
import { InitService } from './service/init.service';
import { APIService } from './service/api.service';
import { CoreService } from './service/core.service';
import { TenantData } from './data/bucket/tenant.bucket';
import { ErrorService } from './service/error.service';
import { Global } from './g';
import { RoleData } from './data/bucket/role.bucket';
import { SiteData } from './data/bucket/site.bucket';
import { LoginUser } from './data/bucket/login-user.bucket';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ErrorHandlerComponent,
        SuccessHandlerComponent,
        UploadWindowComponent,
        SidePanelComponent,
        UploadComponent,
        TimeRemianingPipe
      ],
      providers: [
        InitService,
        APIService,
        CoreService,
        TenantData,
        ErrorService,
        Global,
        RoleData,
        SiteData,
        LoginUser
      ],
      imports: [
        HttpClientModule,
        HttpModule,
        RouterTestingModule,
        ModalModule,
        TabsModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
