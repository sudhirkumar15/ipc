import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssetsComponent } from './manage-assets.component';

describe('ManageAssetsComponent', () => {
  let component: ManageAssetsComponent;
  let fixture: ComponentFixture<ManageAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
