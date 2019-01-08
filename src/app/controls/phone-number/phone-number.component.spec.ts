import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { PhoneNumberComponent } from './phone-number.component';
import { CommonService } from '../../service/common.service';
import { Util } from '../../util';
import { CommonData } from '../../data/bucket/countries.bucket';
import { ErrorService } from '../../service/error.service';
import { Global } from '../../g';

describe('PhoneNumberComponent', () => {
  let component: PhoneNumberComponent;
  let fixture: ComponentFixture<PhoneNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [PhoneNumberComponent],
      providers: [
        CommonService,
        Util,
        CommonData,
        ErrorService,
        Global
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
