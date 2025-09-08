import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDelete } from './series-delete';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SeriesDelete', () => {
  let component: SeriesDelete;
  let fixture: ComponentFixture<SeriesDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesDelete],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call delete series method', () => {
    spyOn(component.store, 'deleteSeries');
    component.delete();
    expect(component.store.deleteSeries).toHaveBeenCalled();
  });
  it('should call hideConfirmationPopUp when cancelled of delete', () => {
    spyOn(component, 'hideConfirmationPopUp');
    component.delete();
    component.cancel();
    expect(component.hideConfirmationPopUp).toHaveBeenCalledTimes(2);
  });
  it('should hideConfirmationPopUp call toggleShowDeleteSeriesConfirmation and toggleOverlay', () => {
    spyOn(component.view, 'toggleShowDeleteSeriesConfirmation');
    spyOn(component.view, 'toggleOverlay');
    component.hideConfirmationPopUp();
    expect(component.view.toggleOverlay).toHaveBeenCalled();
    expect(
      component.view.toggleShowDeleteSeriesConfirmation
    ).toHaveBeenCalled();
  });
});
