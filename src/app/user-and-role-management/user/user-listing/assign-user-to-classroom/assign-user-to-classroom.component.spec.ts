import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserToClassroomComponent } from './assign-user-to-classroom.component';

describe('AssignUserToClassroomComponent', () => {
  let component: AssignUserToClassroomComponent;
  let fixture: ComponentFixture<AssignUserToClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignUserToClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignUserToClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
