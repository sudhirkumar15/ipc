import { TestBed, inject } from '@angular/core/testing';

import { RightSidePanelService } from './right-side-panel.service';

describe('RightSidePanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RightSidePanelService]
    });
  });

  it('should be created', inject([RightSidePanelService], (service: RightSidePanelService) => {
    expect(service).toBeTruthy();
  }));
});
