import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InitService } from './service/init.service';
import { Global } from './g';

let _this;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  initLoad = false;
  noSidePanelRoutes = ['/', '/login', '/register'];
  constructor(
    private initService: InitService,
    private global: Global,
    private router: Router
  ) {
    _this = this;
    _this.init();
  }
  init() {
    _this.initService.init(function (init) {
      _this.initLoad = init;
     });
  }
  isSidePanelEnable() {
    const path = this.router.url.split('?')[0];
    const isEnable = !this.noSidePanelRoutes.includes(path);
    return isEnable;
  }
}
