import { TestBed } from '@angular/core/testing';

import { SeriesSettingsService } from './seriesSettingsService';

describe('SeriesSettingsService', () => {
  let service: SeriesSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriesSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
