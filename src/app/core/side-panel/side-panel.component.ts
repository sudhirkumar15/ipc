import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { Global } from '../../g';
import { LoginUser } from '../../data/bucket/login-user.bucket';
import { JwtHelperService } from '../../service/jwt-helper.service';
let _this;
@Component({
  selector: 'app-side-panel',
  animations: [
    trigger('secondlevel', [
      state('parent', style({ transform: 'translateX(-100%)' })),
      state('child', style({ transform: 'translateX(0%)' })),
      transition('parent <=> child', animate('600ms ease-in')),
    ]),
    trigger('firstlevel', [
      state('parent', style({ transform: 'translateX(0%)' })),
      state('child', style({ transform: 'translateX(-100%)' })),
      transition('parent <=> child', animate('300ms ease-in'))
    ]),
  ],
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  linkList;
  openIndex = -1;
  parentUrl: string;
  parentName: string;
  parentId: string;
  viewState = 'parent';
  displayName: string;
  displayRole: string;

  constructor(
    public global: Global,
    private loginUser: LoginUser,
    private route: Router,
    private jwtHelper: JwtHelperService,
    private activatedRoute: ActivatedRoute
  ) { _this = this; }

  ngOnInit() {
    this.linkList = this.global.getMenu();
    this.getDisplayName();
  }
  togglePanel(index: number = -1, url?: string, name?: string, id?: string) {
    if (index === -1 || this.linkList[index].subMenu) {
      _this.openIndex = _this.openIndex < 0 ? index : -1;
      this.viewState = (_this.openIndex >= 0) ? 'child' : 'parent';
      if (url) {
        this.parentUrl = url;
      }
      if (name) {
        this.parentName = name;
      }
    }
  }
  private getDisplayName() {
    const user = this.getJwtInfo();
    if (user) {
      this.displayName = user['fn'];
      this.displayRole = user['sub'];
    } else {
      this.displayName = this.loginUser.UserInfo.value.fn;
      this.displayRole = this.loginUser.UserInfo.value.sub;
    }
  }
  private getJwtInfo() {
    return this.loginUser.UserInfo.value ? this.loginUser.UserInfo.value : this.jwtHelper.setUserInfo(window.sessionStorage.token);
  }
}
