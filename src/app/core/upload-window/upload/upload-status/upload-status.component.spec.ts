import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadStatusComponent } from './upload-status.component';
import { FileSizePipe } from '../../../../shared/pipes/file-size.pipe';
import { UploadApiService } from '../../service/upload-api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from '../../../../service/error.service';
import { Global } from '../../../../g';
import { ProductData } from '../../../../data/bucket/product.bucket';
import { UploadEventService } from '../../service/upload-event.service';


describe('UploadStatusComponent', () => {
  let component: UploadStatusComponent;
  let fixture: ComponentFixture<UploadStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [FileSizePipe, UploadStatusComponent],
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
        UploadApiService,
        ErrorService,
        ProductData,
        UploadEventService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
