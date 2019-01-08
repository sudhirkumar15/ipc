import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsDropdownModule } from 'ngx-bootstrap';
import { DataTableComponent } from './data-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader/component-loader.factory';
import { PositioningService } from 'ngx-bootstrap/positioning/positioning.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown/bs-dropdown.config';

import { Global } from '../g';
import { PaginationModel } from '../data/pagination.model';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDropdownModule,
        NgxDatatableModule
      ],
      declarations: [ DataTableComponent ],
      providers: [
        {
          provide: Global, useValue: {
            config: {
              siteKey: 'login',
            },
            language: {
              signUp: 'signUp',
            }
          }
        },
        BsDropdownConfig,
        ComponentLoaderFactory,
        PositioningService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.pagination = new PaginationModel;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
