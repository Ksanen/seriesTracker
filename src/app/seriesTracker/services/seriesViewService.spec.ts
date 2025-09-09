import { TestBed } from '@angular/core/testing';

import { SeriesViewService } from './seriesViewService';
import { provideZonelessChangeDetection } from '@angular/core';
import defaultAppViewOptions from '../../shared/utils/defaultValues/defaultAppViewOptions';
import AppOptions from '../../shared/interfaces/appOptions';
import { Subscription } from 'rxjs';

describe('SeriesViewService', () => {
  let service: SeriesViewService;
  let defaultOptions: AppOptions;
  let subscription: Subscription;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(SeriesViewService);
    defaultOptions = defaultAppViewOptions;
  });
  afterEach(() => {
    if (!subscription) return;
    subscription.unsubscribe();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('option$ should give a value', () => {
    subscription = service.options$.subscribe((options) => {
      expect(options).toEqual(defaultAppViewOptions);
    });
  });
  it('showAside should get new value when toggleAside is called', () => {
    service.toggleAside();
    subscription = service.options$.subscribe((options) => {
      expect(options.showAside).toEqual(!defaultAppViewOptions.showAside);
    });
  });
  it('showOverlay should get new value when toggleOverlay is called', () => {
    service.toggleOverlay();
    subscription = service.options$.subscribe((options) => {
      expect(options.showOverlay).toEqual(!defaultAppViewOptions.showOverlay);
    });
  });
  it('showDeleteSeriesConfirmation should get new value when toggleShowDeleteSeriesConfirmation is called', () => {
    service.toggleShowDeleteSeriesConfirmation();
    subscription = service.options$.subscribe((options) => {
      expect(options.showDeleteSeriesConfirmation).toEqual(
        !defaultAppViewOptions.showDeleteSeriesConfirmation
      );
    });
  });
  it('showAddSeriesForm should get new value when toggleAddSeriesForm is called', () => {
    service.toggleAddSeriesForm();
    subscription = service.options$.subscribe((options) => {
      expect(options.showAddSeriesForm).toEqual(
        !defaultAppViewOptions.showAddSeriesForm
      );
    });
  });
  it('toggleAddSeriesForm  should toggleOverlay', () => {
    spyOn(service, 'toggleOverlay');
    service.toggleAddSeriesForm();
    expect(service.toggleOverlay).toHaveBeenCalledTimes(1);
  });
});
