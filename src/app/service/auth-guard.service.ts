import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '@services/auth.service';
import { UserRoleService } from '@services/user-role.service';
import { AccessModel } from '@repository/model/access.model';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private permissionService: UserRoleService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated: boolean = this.authService.isLoggedIn();
    if (!isAuthenticated) {
      this.router.navigate(['/']);
      return false;
    } else {
      if (route.data.accessRules) {
        const access = <AccessModel | Array<AccessModel>>route.data.accessRules;
        const isAccess = this.permissionService.hasAcccess(access);
        if (!isAccess) {
          this.router.navigate(['/noaccess']);
          return false;
        }
      }
      return true;
    }
  }
}
