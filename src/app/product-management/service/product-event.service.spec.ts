import { TestBed, inject } from '@angular/core/testing';

import { ProductEventService } from './product-event.service';

describe('ProductEventService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProductEventService]
        });
    });

    it('should be created', inject([ProductEventService], (service: ProductEventService) => {
        expect(service).toBeTruthy();
    }));
});
