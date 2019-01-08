import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLinkComponent } from './asset-link.component';

describe('AssetLinkComponent', () => {
  let component: AssetLinkComponent;
  let fixture: ComponentFixture<AssetLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
