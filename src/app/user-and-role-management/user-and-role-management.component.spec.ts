import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserAndRoleManagementComponent } from './user-and-role-management.component';

describe('UserAndRoleManagementComponent', () => {
  let component: UserAndRoleManagementComponent;
  let fixture: ComponentFixture<UserAndRoleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
         RouterTestingModule
      ],
      declarations: [ UserAndRoleManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAndRoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
