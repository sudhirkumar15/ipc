import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader/component-loader.factory';
import { PositioningService } from 'ngx-bootstrap/positioning/positioning.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { UserListingComponent } from './user-listing.component';
import { ModalModule } from 'ngx-bootstrap/modal/modal.module';
import { Global } from '../../../g';
import { Util } from '../../../util';
import { UserData } from '../../../data/bucket/user.bucket';
import { UserApiService } from '../service/user-api.service';
import { ErrorService } from '../../../service/error.service';
import { UserService } from '../service/user.service';

class MockUserApiService {
  getUsers() {
    return {
      'users': []
    };
  }
}
describe('UserListingComponent', () => {
  let component: UserListingComponent;
  let fixture: ComponentFixture<UserListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [UserListingComponent],
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
            },
          }
        },
        Util,
        ComponentLoaderFactory,
        PositioningService,
        UserData,
        { provide: UserApiService, useClass: MockUserApiService },
        ErrorService,
        UserService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
