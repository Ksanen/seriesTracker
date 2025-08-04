import { TestBed } from '@angular/core/testing';

import { SeriesStoreService } from './seriesStoreService';

describe('SeriesStoreService', () => {
  let service: SeriesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
