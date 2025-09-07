import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesViewSettings } from './series-view-settings';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SeriesViewSettings', () => {
  let component: SeriesViewSettings;
  let fixture: ComponentFixture<SeriesViewSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesViewSettings],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesViewSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should save viewSettings', () => {
    spyOn(component.seriesSettings, 'saveViewSettings');
    component.onSubmit();
    expect(component.seriesSettings.saveViewSettings).toHaveBeenCalledWith(
      component.seriesViewForm.value
    );
  });
  it('should patch value of seriesViewForm', () => {
    spyOn(component.seriesViewForm, 'patchValue');
    component.setAllFields(false);
    expect(component.seriesViewForm.patchValue).toHaveBeenCalled();
  });
  it('should set all fields to be false', () => {
    component.setAllFields(false);
    const values = Object.values(component.seriesViewForm.value);
    expect(values.every((value) => value === false)).toBe(true);
  });
  it('should set all fields to be true', () => {
    component.setAllFields(true);
    const values = Object.values(component.seriesViewForm.value);
    expect(values.every((value) => value === true)).toBe(true);
  });
});
