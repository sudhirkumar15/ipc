import { Component, Input, OnInit } from '@angular/core';

import { Global } from '../../g';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() rightHeaderQuestion: string;
  @Input() rightHeaderActionLabel: string;
  @Input() rightHeaderActionUrl: string;
  constructor(public global: Global) { }

  ngOnInit() {
  }

}
