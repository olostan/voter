import { TestBed, inject } from '@angular/core/testing';

import { GoogleChartsService } from './google-charts.service';

describe('GoogleChartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleChartsService]
    });
  });

  it('should ...', inject([GoogleChartsService], (service: GoogleChartsService) => {
    expect(service).toBeTruthy();
  }));
});
