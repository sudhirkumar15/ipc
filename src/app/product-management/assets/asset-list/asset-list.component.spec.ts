import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetListComponent } from './asset-list.component';
import { TableHeaderComponent } from '../../../shared/table-header/table-header.component';
import { DataTableComponent } from '../../../data-table/data-table.component';
import { FileSizePipe } from '../../../shared/pipes/file-size.pipe';

import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader/component-loader.factory';
import { PositioningService } from 'ngx-bootstrap/positioning/positioning.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown/bs-dropdown.config';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown/bs-dropdown.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Global } from '../../../g';
import { AssetsApiService } from '../../service/assets-api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from '../../../service/error.service';
import { ProductData } from '../../../data/bucket/product.bucket';
import { DropDownModel } from '../../../data/model/dropdown.model';
import { HttpClient } from 'selenium-webdriver/http';

class MockAssetService {
  getAssets() {

  }
}
describe('AssetListComponent', () => {
  let component: AssetListComponent;
  let fixture: ComponentFixture<AssetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BsDropdownModule,
        NgxDatatableModule
      ],
      declarations: [AssetListComponent, TableHeaderComponent, DataTableComponent,
        FileSizePipe
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
        { provide: AssetsApiService, useClass: MockAssetService },
        BsDropdownConfig,
        ComponentLoaderFactory,
        PositioningService,
        ErrorService,
        ProductData,
        DropDownModel
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
