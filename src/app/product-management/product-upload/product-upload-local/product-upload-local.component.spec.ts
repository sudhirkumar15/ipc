import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUploadLocalComponent } from './product-upload-local.component';

describe('ProductUploadLocalComponent', () => {
  let component: ProductUploadLocalComponent;
  let fixture: ComponentFixture<ProductUploadLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUploadLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUploadLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
