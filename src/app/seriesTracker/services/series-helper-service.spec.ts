import { TestBed } from '@angular/core/testing';

import { SeriesHelperService } from './series-helper-service';
import { SeriesInterface } from '../../shared/interfaces/series';
import defaultFilterSettings from '../../shared/utils/defaultValues/defaultFilterSettings';
import { provideZonelessChangeDetection } from '@angular/core';
import seriesFilterSettings from '../../shared/interfaces/seriesSettings/seriesFilterSettings';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import defaultSeriesForm from '../../shared/utils/forms/defaultSeriesForm';
const series: SeriesInterface = {
  _id: '1',
  names: [],
  type: '',
  genre: '',
  animation: '',
  season: null,
  episode: null,
  watchTimeActive: true,
  watchTime: { hours: 0, minutes: 0, seconds: 20 },
  watched: true,
  tagNames: ['crime', 'drugs'],
};

describe('SeriesHelperService', () => {
  let service: SeriesHelperService;
  let nameValue: string;
  let filterSettings: seriesFilterSettings;
  let exampleSeriesToTest: SeriesInterface;
  let formBuilder: FormBuilder;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [provideZonelessChangeDetection(), FormBuilder],
    });
    formBuilder = TestBed.inject(FormBuilder);
    service = TestBed.inject(SeriesHelperService);
    exampleSeriesToTest = structuredClone(series);
    filterSettings = structuredClone(defaultFilterSettings);
    nameValue = '';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should filter name correctly when name is empty', () => {
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);

    exampleSeriesToTest.names = ['Adam', 'Jan'];
    result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });
  it('should filter name correctly when is not empty', () => {
    nameValue = 'Jan';
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(false);

    exampleSeriesToTest.names = ['Jan', 'test'];
    result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });
  it('should filter name correctly when nameValue is inside string', () => {
    exampleSeriesToTest.names = ['aaa', 'aajan'];
    nameValue = 'jan';
    const result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });
  it('should filter name correctly (case insensitive) ', () => {
    nameValue = 'jan';
    exampleSeriesToTest.names = ['aJaN'];
    const result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });

  it('should filter type field correctly', () => {
    filterSettings.type = 'movie';
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(false);
    exampleSeriesToTest.type = 'movie';
    result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });
  it('should filter genre field correctly', () => {
    filterSettings.genre = 'action';
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(false);

    exampleSeriesToTest.genre = 'action';
    result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });
  it('should filter animation field correctly', () => {
    filterSettings.animation = 'cartoon';
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(false);
    exampleSeriesToTest.animation = 'cartoon';
    result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });
  it('should filter animation field correctly', () => {
    filterSettings.animation = 'cartoon';
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(false);
    exampleSeriesToTest.animation = 'cartoon';
    result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });
  it('should filter  watched correctly', () => {
    exampleSeriesToTest.watched = true;
    filterSettings.watched = '1';
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
    exampleSeriesToTest.watched = false;
    result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(false);
  });
  it('should filter  season correctly', () => {
    filterSettings.season = 1;
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(false);
    exampleSeriesToTest.season = 1;
    result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });
  it('should filter  episode correctly', () => {
    filterSettings.episode = 1;
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(false);
    exampleSeriesToTest.episode = 1;
    result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });
  it('should return false when series has no matching tag', () => {
    filterSettings.tags = ['test1'];
    exampleSeriesToTest.tagNames = ['Jan'];
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(false);
  });
  it('should return true when series has a matching tag', () => {
    filterSettings.tags = ['test1'];
    exampleSeriesToTest.tagNames = ['jan', 'test1'];
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });
  it('should return false when not all filter tags are present in the series', () => {
    filterSettings.tags = ['test1', 'test2'];
    exampleSeriesToTest.tagNames = ['jan', 'test1'];
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(false);
  });
  it('should return true when all filter tags are present in the series', () => {
    filterSettings.tags = ['test1', 'test2'];
    exampleSeriesToTest.tagNames = ['test2', 'test1'];
    let result = service.filterSeries(
      exampleSeriesToTest,
      filterSettings,
      nameValue
    );
    expect(result).toBe(true);
  });
  it('isFormValid should return true, when seriesForm is valid', () => {
    const form = formBuilder.group(defaultSeriesForm);
    form.controls['name'].setValue('Imie');
    expect(service.isFormValid(form)).toBe(true);
  });
  it('isFormValid should return false, when seriesForm is invalid', () => {
    const form = formBuilder.group(defaultSeriesForm);
    form.controls['name'].setValue('');
    expect(service.isFormValid(form)).toBe(false);
  });
});
