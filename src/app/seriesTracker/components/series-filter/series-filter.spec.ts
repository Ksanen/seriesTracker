import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesFilter } from './series-filter';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import defaultFilterSettings from '../../../shared/utils/defaultValues/defaultFilterSettings';
import seriesFilterSettings from '../../../shared/interfaces/seriesSettings/seriesFilterSettings';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('SeriesFilter', () => {
  let component: SeriesFilter;
  let fixture: ComponentFixture<SeriesFilter>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesFilter],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have defined genreList,typeList,animationList', () => {
    expect(component.genreList).toBeDefined();
    expect(component.typeList).toBeDefined();
    expect(component.animationList).toBeDefined();
  });
  it('should clear tagNames', () => {
    component.tagNames = ['jan', 'test'];
    component.reset();
    expect(component.tagNames.length).toBe(0);
  });
  it('should reset seriesFilterForm', () => {
    component.seriesFilterForm.patchValue({
      episode: 2,
      season: 1,
      genre: 'action',
      watched: 'false',
      type: 'series',
      animation: 'cartoon',
      tags: ['test', 'test2'],
    });
    component.resetSeriesFilterForm();
    const values = component.seriesFilterForm.value;
    const resetValues = {
      ...values,
      tags: component.tagNames,
    };
    expect(resetValues).toEqual(defaultFilterSettings);
  });
  it('should remove tagName', () => {
    component.tagNames = ['test1', 'test2', 'test3'];
    const tagNameToRemove = 'test1';
    component.removeTag(tagNameToRemove);
    expect(component.tagNames.every((tag) => tag !== tagNameToRemove)).toBe(
      true
    );
  });
  it('should update filterSettings', () => {
    spyOn(component.seriesSettings, 'updateFilterSettings');
    component.updateFilterSettings();
    expect(component.seriesSettings.updateFilterSettings).toHaveBeenCalledWith({
      ...component.seriesFilterForm.value,
      tags: component.tagNames,
    });
  });
  it('should call resetSeriesFilterForm and updateFilterSettings', () => {
    spyOn(component, 'updateFilterSettings');
    spyOn(component, 'resetSeriesFilterForm');
    component.reset();
    expect(component.updateFilterSettings).toHaveBeenCalled();
    expect(component.resetSeriesFilterForm).toHaveBeenCalled();
  });
});
