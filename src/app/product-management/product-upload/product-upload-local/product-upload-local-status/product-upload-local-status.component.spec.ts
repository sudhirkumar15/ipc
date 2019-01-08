import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUploadLocalStatusComponent } from './product-upload-local-status.component';

describe('ProductUploadLocalStatusComponent', () => {
  let component: ProductUploadLocalStatusComponent;
  let fixture: ComponentFixture<ProductUploadLocalStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUploadLocalStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUploadLocalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
