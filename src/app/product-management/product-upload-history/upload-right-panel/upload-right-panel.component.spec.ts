import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRightPanelComponent } from './upload-right-panel.component';

describe('UploadRightPanelComponent', () => {
  let component: UploadRightPanelComponent;
  let fixture: ComponentFixture<UploadRightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadRightPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
