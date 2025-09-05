import { TestBed } from '@angular/core/testing';

import { SeriesApiService } from './seriesApiService';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SeriesApiService', () => {
  let service: SeriesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SeriesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
