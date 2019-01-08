import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumCreatorComponent } from './curriculum-creator.component';

describe('CurriculumCreatorComponent', () => {
  let component: CurriculumCreatorComponent;
  let fixture: ComponentFixture<CurriculumCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
