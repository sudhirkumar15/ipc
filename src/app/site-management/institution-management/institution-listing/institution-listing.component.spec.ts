import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionListingComponent } from './institution-listing.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Global } from '../../../g';
import { SiteData } from '../../../data/bucket/site.bucket';
class MockSiteData {

  public SiteListData = {
    get value() {
      return {
        data: {

        }
      };
    }
  };
}
describe('InstitutionListingComponent', () => {
  let component: InstitutionListingComponent;
  let fixture: ComponentFixture<InstitutionListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [InstitutionListingComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
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
        { provide: SiteData, useClass: MockSiteData }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
