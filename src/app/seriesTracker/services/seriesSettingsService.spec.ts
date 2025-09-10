import { TestBed } from '@angular/core/testing';

import { SeriesSettingsService } from './seriesSettingsService';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import defaultFilterSettings from '../../shared/utils/defaultValues/defaultFilterSettings';
import defaultViewSettings from '../../shared/utils/defaultValues/defaultViewSettings';

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
  it('should update filterSettings', () => {
    const filterSettings = structuredClone(defaultFilterSettings);
    filterSettings.type = 'movie';
    service.updateFilterSettings(filterSettings);
    const subscription = service.filterSettings$.subscribe((settings) => {
      expect(settings).toEqual(filterSettings);
    });
    subscription.unsubscribe();
  });
  it('saveViewSettings should update viewSettings', () => {
    const settingsToTest = defaultViewSettings;
    let subscription = service.viewSettings$.subscribe((settings) => {
      expect(settings).toEqual(settingsToTest);
    });
    subscription.unsubscribe();
    settingsToTest.animation = true;
    service.saveViewSettings(settingsToTest);
    subscription = service.viewSettings$.subscribe((settings) => {
      expect(settings).toEqual(settingsToTest);
    });
    subscription.unsubscribe();
  });
});
