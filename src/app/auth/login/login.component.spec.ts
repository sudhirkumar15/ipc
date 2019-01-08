import { async, ComponentFixture, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LoginComponent } from './login.component';
import { HeaderComponent } from '../header/header.component';
import { LoginUser } from '../../data/bucket/login-user.bucket';
import { Global } from '../../g';
import { JwtHelperService } from '../../service/jwt-helper.service';
import { Util } from '../../util';
import { AuthApiService } from '../service/auth-api.service';
import { ErrorService } from '../../service/error.service';
import { TenantData } from '../../data/bucket/tenant.bucket';
import { AuthEventService } from '../service/auth-event.service';
import { Router } from '@angular/router';
import { Directive, Input } from '@angular/core';



export class TenantComponent {
}
/**
 * Mock Router link
 */
@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

class MockLoginUser {
  public LoginResponseData = {
    get value(): any {
      return {
        data: {
        }
      };
    },
    set value(v: any) {

    }
  };

  public LoginPostData = {
    get value(): any {
      return {
        email: '',
        password: ''
      };
    },
    set value(v: any) {

    }
  };
}

class MockJwtHelper {
  setUserInfo() { }
}
class RouterStub {
  navigate(url: any) { return url; }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, HeaderComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
      providers: [
        {
          provide: Global, useValue: {
            language: {
              alreadyRegister: 'alreadyRegister',
              login: 'login',
            }
          }
        },
        { provide: JwtHelperService, useClass: MockJwtHelper },
        Util,
        AuthApiService,
        { provide: LoginUser, useClass: MockLoginUser },
        ErrorService, TenantData,
        AuthEventService,
      ]
    })
      .compileComponents();
    location = TestBed.get(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when no username and password', () => {
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should have valid form after entering email and password', () => {
    const email = component.loginForm.get('email');
    const password = component.loginForm.get('password');
    email.setValue('developer@mail.com');
    password.setValue('developer@mail.com');
    expect(component.loginForm.valid).toBeTruthy();
  });
  it('submiting login form', () => {
    const authApiService = fixture.debugElement.injector.get(AuthApiService);
    const spy = spyOn(authApiService, 'login').and.returnValue(true);
    expect(component.loginForm.invalid).toBeTruthy();
    const email = component.loginForm.get('email');
    const password = component.loginForm.get('password');
    email.setValue('developer@mail.com');
    password.setValue('developer@mail.com');
    component.login();
    expect(component.showLoader).toBeTruthy();
    expect(component.loginForm.get('email').value).toBe('developer@mail.com');
  });

  it('should set error when invalid login', fakeAsync(() => {
    const eventService = fixture.debugElement.injector.get(AuthEventService);
    const errorService = fixture.debugElement.injector.get(ErrorService);
    const spy = spyOnProperty(eventService, 'authEvent', 'get').and.returnValue(
      Observable.of('login_failed')
    );
    const navigateSpy = spyOn(errorService, 'setError').and.returnValue(true);
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(component.showLoader).toBeFalsy();
  }));

});

describe('Succesful Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [
        LoginComponent,
        HeaderComponent,
        RouterLinkStubDirective
      ],
      providers: [
        {
          provide: Global, useValue: {
            language: {
              alreadyRegister: 'alreadyRegister',
              login: 'login',
            }
          }
        },
        { provide: JwtHelperService, useClass: MockJwtHelper },
        Util,
        { provide: Router, useClass: RouterStub },
        { provide: LoginUser, useClass: MockLoginUser },
        AuthApiService,
        { provide: LoginUser, useClass: MockLoginUser },
        ErrorService,
        TenantData,
        AuthEventService,
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
      });
  }));
  it('should tell it is logged in succesfuly',
    inject([Router], (router: Router) => {
      const eventService = fixture.debugElement.injector.get(AuthEventService);
      const errorService = fixture.debugElement.injector.get(ErrorService);
      const routerspy = spyOn(router, 'navigate');
      const spy = spyOnProperty(eventService, 'authEvent', 'get').and.returnValue(
        Observable.of('login_ok')
      );
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.showLoader).toBeFalsy();
    }));
});
