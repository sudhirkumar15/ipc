import { Component, OnInit, TemplateRef } from '@angular/core';

import { Global } from '../../../../g';


@Component({
  selector: 'app-curriculum-creator',
  templateUrl: './curriculum-creator.component.html',
  styleUrls: ['./curriculum-creator.component.scss']
})
export class CurriculumCreatorComponent implements OnInit {

  constructor(public global: Global) { }
  isFirstOpen = true;
  oneAtATime = true;

  assetListModel: boolean ;

  ngOnInit() {
  }

  openAssetModel() {
    this.assetListModel = true;
  }
  onCloseWindow(event) {
    this.assetListModel = false;
  }
}
