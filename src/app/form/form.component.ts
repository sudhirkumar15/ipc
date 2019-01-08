import { Component, OnInit , Input } from '@angular/core';
let _this;
@Component({
 selector: 'app-form',
 templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  constructor() { _this = this; }
  ngOnInit() {

  }
}
