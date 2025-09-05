import { TestBed } from '@angular/core/testing';

import { SeriesSettingsService } from './seriesSettingsService';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SeriesSettingsService', () => {
  let service: SeriesSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SeriesSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
