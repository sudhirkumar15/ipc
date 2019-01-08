import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDetailsWindowComponent } from './table-details-window.component';

describe('TableDetailsWindowComponent', () => {
  let component: TableDetailsWindowComponent;
  let fixture: ComponentFixture<TableDetailsWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDetailsWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDetailsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
