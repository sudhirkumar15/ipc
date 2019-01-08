import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthApiService } from './auth-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from '../../service/error.service';
import { Global } from '../../g';
import { LoginUser } from '../../data/bucket/login-user.bucket';
import { TenantData } from '../../data/bucket/tenant.bucket';
import { AuthEventService } from './auth-event.service';
import { RestApiService } from '../../service/rest-api.service';
import { Observable } from 'rxjs/Observable';
import { LoginModel } from '../../data/model/login-user.model';
export class MockLoginUser {
  public LoginPostData = {
    get value(): LoginModel {
      return { email: 'test', password: 'test' };
    }
  };
}
describe('AuthApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authApiService: AuthApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthApiService,
        ErrorService,
        {
          provide: Global, useValue: {
            config: {
              domain: 'http://test.com/',
              apipath: 'api/',
              apiendpoints: {
                login: 'login',
                register: 'register'
              }
            }
          }
        },
        { provide: LoginUser, useClass: MockLoginUser },
        TenantData,
        AuthEventService,
        RestApiService
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    authApiService = TestBed.get(AuthApiService);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#login', () => {
    beforeEach(() => {
      authApiService = TestBed.get(AuthApiService);
    });
    it('should return token', () => {
      const rest = TestBed.get(RestApiService);
      const g = TestBed.get(Global);
      const restSpy = spyOn(rest, 'post').and.returnValue(
        Observable.of('test')
      );
      authApiService.login();
      const req = httpTestingController.expectOne(
        g.config.domain + g.config.apipath + g.config.apiendpoints.login
      );
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
        email: 'test', password: 'test'
      });
    });

    it('should register user', () => {
      const rest = TestBed.get(RestApiService);
      const g = TestBed.get(Global);
      const restSpy = spyOn(rest, 'post').and.returnValue(
        Observable.of('test')
      );
      authApiService.register();
      const req = httpTestingController.expectOne(
        g.config.domain + g.config.apipath + g.config.apiendpoints.register
      );
      expect(req.request.method).toEqual('POST');
     /* expect(req.request.body).toEqual({
        email: 'test', password: 'test'
      });*/
    });
  });

});
