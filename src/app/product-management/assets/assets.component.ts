import { Component, OnInit } from '@angular/core';
import { AssetsApiService } from '../service/assets-api.service';
import { AssetsApiEventService } from '@products/service/assets-api-event.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
