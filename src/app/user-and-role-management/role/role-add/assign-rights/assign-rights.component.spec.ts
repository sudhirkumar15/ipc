import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRightsComponent } from './assign-rights.component';

describe('AssignRightsComponent', () => {
  let component: AssignRightsComponent;
  let fixture: ComponentFixture<AssignRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
