import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropDownModel } from '../../data/model/dropdown.model';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader/component-loader.factory';
import { PositioningService } from 'ngx-bootstrap/positioning/positioning.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown/bs-dropdown.config';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown/bs-dropdown.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ProductUploadHistoryComponent } from './product-upload-history.component';
import { TableHeaderComponent } from '../../shared/table-header/table-header.component';
import { DataTableComponent } from '../../data-table/data-table.component';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { Global } from '../../g';
import { UploadHistoryApiService } from '../service/upload-history-api.service';
import { ErrorService } from '../../service/error.service';
import { ProductData } from '../../data/bucket/product.bucket';
import { UploadEventService } from '../../core/upload-window/service/upload-event.service';


class MockUploadHistoryApiService {
  getUploadHistory() { }
}

describe('ProductUploadHistoryComponent', () => {
  let component: ProductUploadHistoryComponent;
  let fixture: ComponentFixture<ProductUploadHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxDatatableModule,
        BsDropdownModule,
        HttpClientModule
      ],
      declarations: [ProductUploadHistoryComponent,
        TableHeaderComponent,
        FileSizePipe,
        DataTableComponent
      ],
      providers: [
        {
          provide: Global, useValue: {
            config: {
              pageSizes: '',
            },
            language: {
              signUp: 'signUp',
            }
          }
        },
        { provide: UploadHistoryApiService, useClass: MockUploadHistoryApiService },
        ErrorService,
        ProductData,
        UploadEventService,
        DropDownModel,
        ComponentLoaderFactory,
        PositioningService,
        BsDropdownConfig
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUploadHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
