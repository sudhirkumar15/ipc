import { Component, OnInit } from '@angular/core';
import { Global } from '../../g';
let _this;
@Component({
  selector: 'app-success-handler',
  templateUrl: './success-handler.component.html',
  styleUrls: ['./success-handler.component.scss']
})
export class SuccessHandlerComponent implements OnInit {

  constructor(public global: Global) { _this = this; }

  ngOnInit() { }

  closePopup() {
    _this.global.apiSuccess = '';
  }
}
