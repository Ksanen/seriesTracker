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
  it("should setError with message 'failed to get resources from server' when status is 0", () => {
    spyOn(service, 'setError').and.callThrough();
    const response = {
      status: 0,
    };
    service.handleError(response);
    expect(service.setError).toHaveBeenCalledWith(
      'failed to get resources from server'
    );
  });
  it('if error status belongs to the globalStatusErrors then error should be set with response.error.msg', () => {
    spyOn(service, 'setError').and.callThrough();
    const response = {
      status: 404,
      error: {
        success: false,
        msg: 'series not found',
      },
    };
    service.handleError(response);
    expect(service.setError).toHaveBeenCalledWith(response.error.msg);
  });
  it('default value of options should be defaultAppViewOptions', () => {
    const subscription = service.options$.subscribe((options) => {
      expect(options).toEqual(defaultAppViewOptions);
    });
    subscription.unsubscribe();
  });
  it('toggleOption should toggle an option', () => {
    const newOptions = {
      showOverlay: false,
      showAddSeriesForm: true,
      showAside: false,
      showDeleteSeriesConfirmation: false,
    };
    service.toggleOption('showAside');
    const subscription = service.options$.subscribe((options) => {
      expect(options.showAside).toEqual(true);
    });
    subscription.unsubscribe();
  });
});
