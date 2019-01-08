import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumSettingsComponent } from './curriculum-settings.component';

describe('CurriculumSettingsComponent', () => {
  let component: CurriculumSettingsComponent;
  let fixture: ComponentFixture<CurriculumSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
