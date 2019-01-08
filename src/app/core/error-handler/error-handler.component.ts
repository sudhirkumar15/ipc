import { Component, OnInit } from '@angular/core';
import { Global } from '../../g';
let _this;
@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss']
})
export class ErrorHandlerComponent implements OnInit {

  constructor(public global: Global) { _this = this; }

  ngOnInit() { }

  closePopup() {
    _this.global.apiError = '';
  }

}
