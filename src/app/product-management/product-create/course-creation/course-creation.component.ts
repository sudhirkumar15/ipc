import { Component, OnInit, OnDestroy} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Global } from '../../../g';
import { ProductData } from '../../../data/bucket/product.bucket';
import { ProductEventService } from '../../service/product-event.service';
@Component({
  selector: 'app-course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.scss']
})
export class CourseCreationComponent implements OnInit, OnDestroy {
  productApiEventSucessSubscription: Subscription;
  constructor(public global: Global,
    public productData: ProductData,
    private productEventService: ProductEventService) { }

  ngOnInit() {
    this.productData.AddProductActiveTabName.activeTabName = 'manageassets';
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
      case 'manageassets':
        this.productData.AddProductActiveTabName.activeTabName = 'manageassets';
        break;
      case 'productdetails':
        this.productData.AddProductActiveTabName.activeTabName = 'productdetails';
        break;
      case 'settings':
        this.productData.AddProductActiveTabName.activeTabName = 'settings';
        break;
    }
  }
}
