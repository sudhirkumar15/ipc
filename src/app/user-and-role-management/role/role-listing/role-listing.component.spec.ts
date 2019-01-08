import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';


import { RoleListingComponent } from './role-listing.component';
import { Global } from '../../../g';
import { RoleData } from '../../../data/bucket/role.bucket';
import { RouterTestingModule } from '@angular/router/testing';
import { RoleApiService } from '../../role/service/role-api.service';
import { CoreService } from '../../../service/core.service';
import { TenantData } from '../../../data/bucket/tenant.bucket';
import { ErrorService } from '../../../service/error.service';
import { RoleService } from '../../role/service/role.service';
import { ApiEventService } from '../../../service/api-event.service';

class MockRoleApiService {
  getroles() {
    return {
      roles: []
    };
  }
}
describe('RoleListingComponent', () => {
  let component: RoleListingComponent;
  let fixture: ComponentFixture<RoleListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        HttpClientModule
      ],
      declarations: [RoleListingComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        {
          provide: Global, useValue: {
            config: {
              pageSizes: [10]
            },
            language: {
              signUp: 'signUp',
            }
          }
        },
        RoleData,
        { provide: RoleApiService, useClass: MockRoleApiService },
        CoreService,
        TenantData,
        ErrorService,
        RoleService,
        ApiEventService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
