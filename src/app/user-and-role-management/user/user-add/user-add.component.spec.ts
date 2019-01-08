import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader/component-loader.factory';
import { PositioningService } from 'ngx-bootstrap/positioning/positioning.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown/bs-dropdown.config';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown/bs-dropdown.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { UserAddComponent } from './user-add.component';
import { DropDownModel } from '../../../data/model/dropdown.model';
import { Global } from '../../../g';
import { Util } from '../../../util';
import { UserData } from '../../../data/bucket/user.bucket';
import { UserApiService } from '../service/user-api.service';
import { ErrorService } from '../../../service/error.service';
import { RoleApiService } from '../../role/service/role-api.service';
import { CoreService } from '../../../service/core.service';
import { TenantData } from '../../../data/bucket/tenant.bucket';
import { RoleData } from '../../../data/bucket/role.bucket';
import { RoleService } from '../../role/service/role.service';
import { ApiEventService } from '../../../service/api-event.service';
import { UserService } from '../service/user.service';


class MockRoleApiService {
  getroles() {
    return {
      roles: []
    };
  }
}
describe('UserAddComponent', () => {
  let component: UserAddComponent;
  let fixture: ComponentFixture<UserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule,
        RouterTestingModule,
        HttpClientModule,
        HttpModule
      ],
      declarations: [ UserAddComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        DropDownModel,
        {
          provide: Global, useValue: {
            config: {
              pageSizes: '',
            },
            language: {
              signUp: 'signUp',
            }
          }
        },
        Util,
        UserData,
        UserApiService,
        ErrorService,
        {provide: RoleApiService, useClass: MockRoleApiService},
        CoreService,
        TenantData,
        RoleData,
        RoleService,
        ApiEventService,
        ComponentLoaderFactory,
        PositioningService,
        BsDropdownConfig,
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
