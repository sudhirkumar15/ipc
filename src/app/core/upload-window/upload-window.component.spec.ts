import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { PositioningService } from 'ngx-bootstrap/positioning/positioning.service';
import { ComponentFactoryResolver } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader/component-loader.factory';
import { TabsetConfig } from 'ngx-bootstrap/tabs/tabset.config';

import { UploadWindowComponent } from './upload-window.component';
import { UploadComponent } from './upload/upload.component';
import { TimeRemianingPipe } from '../../shared/pipes/time-remianing.pipe';
import { UploadEventService } from './service/upload-event.service';
import { Global } from '../../g';
import { ErrorService } from '../../service/error.service';
import { ProductData } from '../../data/bucket/product.bucket';

describe('UploadWindowComponent', () => {
  let component: UploadWindowComponent;
  let fixture: ComponentFixture<UploadWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ModalModule,
        TabsModule,
        RouterTestingModule
      ],
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
        UploadEventService,
        ComponentLoaderFactory,
        PositioningService,
        TabsetConfig,
        ErrorService,
        ProductData
      ],
      declarations: [UploadWindowComponent, UploadComponent, TimeRemianingPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
