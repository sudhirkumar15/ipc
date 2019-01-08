import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUploadInfoComponent } from './tab-upload-info.component';

describe('TabUploadInfoComponent', () => {
  let component: TabUploadInfoComponent;
  let fixture: ComponentFixture<TabUploadInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabUploadInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUploadInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
