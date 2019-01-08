import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumCreationComponent } from './curriculum-creation.component';

describe('CurriculumCreationComponent', () => {
  let component: CurriculumCreationComponent;
  let fixture: ComponentFixture<CurriculumCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
