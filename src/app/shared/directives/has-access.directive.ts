import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { UserRoleService } from '@services/user-role.service';
import { AccessModel } from '@repository/model/access.model';

@Directive({
  selector: '[appHasAccess]'
})
export class HasAccessDirective {
  private permissionKey: AccessModel | Array<AccessModel>;

  @Input() set appHasAccess(p: AccessModel | Array<AccessModel>) {
    this.permissionKey = p;
    this.hasAccess();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private permissionService: UserRoleService
  ) {
  }

  private hasAccess() {
    if (this.permissionKey) {
      if (this.permissionService.hasAcccess(this.permissionKey)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        return true;
      } else {
        this.viewContainerRef.clear();
      }
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      return true;
    }
  }
}
