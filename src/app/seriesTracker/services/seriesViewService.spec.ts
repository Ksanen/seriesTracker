import { TestBed } from '@angular/core/testing';

import { SeriesViewService } from './seriesViewService';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SeriesViewService', () => {
  let service: SeriesViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(SeriesViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
