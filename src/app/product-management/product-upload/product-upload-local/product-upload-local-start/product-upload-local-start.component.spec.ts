import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUploadLocalStartComponent } from './product-upload-local-start.component';

describe('ProductUploadLocalStartComponent', () => {
  let component: ProductUploadLocalStartComponent;
  let fixture: ComponentFixture<ProductUploadLocalStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUploadLocalStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUploadLocalStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
