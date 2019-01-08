import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetReplaceComponent } from './asset-replace.component';

describe('AssetReplaceComponent', () => {
  let component: AssetReplaceComponent;
  let fixture: ComponentFixture<AssetReplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetReplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
