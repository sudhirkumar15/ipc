import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPublishComponent } from './settings-publish.component';

describe('SettingsPublishComponent', () => {
  let component: SettingsPublishComponent;
  let fixture: ComponentFixture<SettingsPublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
