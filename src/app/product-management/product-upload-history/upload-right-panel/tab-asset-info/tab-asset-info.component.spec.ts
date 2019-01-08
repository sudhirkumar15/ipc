import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAssetInfoComponent } from './tab-asset-info.component';

describe('TabAssetInfoComponent', () => {
  let component: TabAssetInfoComponent;
  let fixture: ComponentFixture<TabAssetInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAssetInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAssetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
