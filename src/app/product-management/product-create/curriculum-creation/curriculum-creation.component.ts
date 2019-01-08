import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Global } from 'app/g';
import { ProductData } from '@repository/bucket/product.bucket';
import { ProductEventService } from '@products/service/product-event.service';

@Component({
  selector: 'app-curriculum-creation',
  templateUrl: './curriculum-creation.component.html',
  styleUrls: ['./curriculum-creation.component.scss']
})
export class CurriculumCreationComponent implements OnInit, OnDestroy {
  productApiEventSucessSubscription: Subscription;
  constructor(public global: Global,
    public productData: ProductData,
    private productEventService: ProductEventService) { }

  ngOnInit() {
    this.productData.AddProductActiveTabName.activeTabName = 'curriculumcreator';
    this.productApiEventSucessSubscription = this.productEventService.productApiEvent.subscribe(
      (event) => {
        this.handleEvent(event);
      });
  }

  ngOnDestroy() {
    this.productApiEventSucessSubscription.unsubscribe();
  }

  handleEvent(event: string) {
    event = event.toLowerCase();
    switch (event) {
      case 'curriculumcreator':
        this.productData.AddProductActiveTabName.activeTabName = 'curriculumcreator';
        break;
      case 'curriculumsettings':
        this.productData.AddProductActiveTabName.activeTabName = 'curriculumsettings';
        break;
    }
  }
}
