import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModalSearchComponent } from './product-modal-search.component';

describe('ProductModalSearchComponent', () => {
  let component: ProductModalSearchComponent;
  let fixture: ComponentFixture<ProductModalSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductModalSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
