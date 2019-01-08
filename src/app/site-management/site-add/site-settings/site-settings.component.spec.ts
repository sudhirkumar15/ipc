import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SiteSettingsComponent } from './site-settings.component';
import { Global } from '../../../g';
import { SiteEventService } from '../../service/site-event.service';

describe('SiteSettingsComponent', () => {
  let component: SiteSettingsComponent;
  let fixture: ComponentFixture<SiteSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [SiteSettingsComponent],
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
        SiteEventService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
