import { Component, OnInit } from '@angular/core';
import { ProductApiService } from './service/product-api.service';
import { ProductService } from './service/product.service';
import { ProductEventService } from './service/product-event.service';
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
  providers: [ProductApiService, ProductService, ProductEventService]
})
export class ProductManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
