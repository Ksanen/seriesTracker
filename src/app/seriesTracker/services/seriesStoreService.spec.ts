import { TestBed } from '@angular/core/testing';

import { SeriesStoreService } from './seriesStoreService';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SeriesStoreService', () => {
  let service: SeriesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SeriesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
