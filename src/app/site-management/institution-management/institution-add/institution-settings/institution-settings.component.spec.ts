import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { InstitutionSettingsComponent } from './institution-settings.component';
import { Global } from '../../../../g';
import { InstitutionEventService } from '../../service/institution-event.service';
import { InstitutionData } from '../../../../data/bucket/institution.bucket';

describe('InstitutionSettingsComponent', () => {
  let component: InstitutionSettingsComponent;
  let fixture: ComponentFixture<InstitutionSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ InstitutionSettingsComponent ],
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
        InstitutionEventService,
        InstitutionData
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
