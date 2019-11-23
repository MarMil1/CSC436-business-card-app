/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BusinessCardsService } from './businessCards.service';

describe('Service: BusinessCards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessCardsService]
    });
  });

  it('should ...', inject([BusinessCardsService], (service: BusinessCardsService) => {
    expect(service).toBeTruthy();
  }));
});
