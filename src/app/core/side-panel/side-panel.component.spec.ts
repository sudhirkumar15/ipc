import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SidePanelComponent } from './side-panel.component';
import { Global } from '../../g';
import { LoginUser } from '../../data/bucket/login-user.bucket';
import { JwtHelperService } from '../../service/jwt-helper.service';

class MockJwtHelperService {
  setUserInfo() { }
}
class MockLoginUser {
  public UserInfo = {
    get value() {
      return {
        fn: 'test'
      };
    }
  };
}
describe('SidePanelComponent', () => {
  let component: SidePanelComponent;
  let fixture: ComponentFixture<SidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: Global, useValue: {
            config: {
              siteKey: 'login',
            },
            language: {
              signUp: 'signUp',
            },
            getMenu() {
              return [
                {
                  name: this.language.tenants,
                  url: 'tenants',
                  subMenu: [
                    { 'name': this.language.registrations, 'url': 'tenants/add' },
                    { 'name': this.language.existingTenants, 'url': 'exits' }]
                },
                {
                  name: this.language.userandRoles,
                  url: 'roles',
                  subMenu: [
                    { 'name': this.language.role, 'url': 'roles' },
                    { 'name': this.language.new, 'url': 'roles/add' },
                    { 'name': this.language.user, 'url': 'roles/users' }
                  ]
                },
                {
                  name: this.language.sites,
                  url: 'sites'
                },
                {
                  name: this.language.products,
                  url: 'products',
                  subMenu: [
                    { 'name': this.language.upload_label_upload_history, 'url': 'products/upload/history' },
                    { 'name': this.language.assets, 'url': 'products/assets' }
                  ]
                },
              ];
            },
          }
        },
        { provide: LoginUser, useClass: MockLoginUser },
        { provide: JwtHelperService, useClass: MockJwtHelperService }
      ],
      declarations: [SidePanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
