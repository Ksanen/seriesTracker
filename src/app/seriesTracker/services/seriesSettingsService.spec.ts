import { TestBed } from '@angular/core/testing';

import { SeriesSettingsService } from './seriesSettingsService';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import defaultFilterSettings from '../../shared/utils/defaultValues/defaultFilterSettings';
import defaultViewSettings from '../../shared/utils/defaultValues/defaultViewSettings';
import { SeriesApiService } from './seriesApiService';
import { of, throwError } from 'rxjs';
import { SeriesViewService } from './seriesViewService';

describe('SeriesSettingsService', () => {
  let service: SeriesSettingsService;
  let api: SeriesApiService;
  let view: SeriesViewService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        SeriesApiService,
        SeriesViewService,
      ],
    });
    service = TestBed.inject(SeriesSettingsService);
    api = TestBed.inject(SeriesApiService);
    view = TestBed.inject(SeriesViewService);
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
  it('settings should be by default defaultViewSettings', () => {
    service.viewSettings$.subscribe((settings) => {
      expect(settings).toEqual(defaultViewSettings);
    });
  });

  it('getViewSettings should update viewSettings value', () => {
    const exampleSettings = {
      name: true,
      season: true,
      episode: false,
      watched: true,
      watchtime: true,
      type: true,
      genre: false,
      animation: true,
      tags: true,
    };
    spyOn(api, 'getViewSettings').and.returnValue(of(exampleSettings));
    service.getViewSettings();
    service.viewSettings$.subscribe((settings) => {
      expect(settings).toEqual(exampleSettings);
    });
  });
  it('getViewSettings should call handleError and console.log error', () => {
    spyOn(api, 'getViewSettings').and.returnValue(
      throwError(() => new Error('error'))
    );
    spyOn(console, 'log').and.callThrough();
    spyOn(view, 'handleError');
    service.getViewSettings();
    expect(view.handleError).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });
});
