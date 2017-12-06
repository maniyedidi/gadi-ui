import { TestBed, inject } from '@angular/core/testing';

import { GadiService } from './gadi.service';

describe('GadiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GadiService]
    });
  });

  it('should be created', inject([GadiService], (service: GadiService) => {
    expect(service).toBeTruthy();
  }));
});
