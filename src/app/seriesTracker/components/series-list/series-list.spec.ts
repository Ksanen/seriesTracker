import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesList } from './series-list';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SeriesInterface } from '../../../shared/interfaces/series';
import defaultFilterSettings from '../../../shared/utils/defaultValues/defaultFilterSettings';
const exampleSeries: SeriesInterface[] = [
  {
    _id: '1',
    names: ['Breaking Bad'],
    type: '',
    genre: '',
    animation: '',
    season: 5,
    episode: 16,
    watchTimeActive: true,
    watchTime: { hours: 0, minutes: 0, seconds: 20 },
    watched: true,
    tagNames: ['crime', 'drugs'],
  },
  {
    _id: '2',
    names: ['Stranger Things'],
    type: '',
    genre: '',
    animation: '',
    season: 4,
    episode: 9,
    watchTimeActive: false,
    watchTime: { hours: 2, minutes: 0, seconds: 20 },
    watched: false,
    tagNames: ['mystery', '80s'],
  },
  {
    _id: '3',
    names: ['cos1', 'tebreTest'],
    type: '',
    genre: '',
    animation: '',
    season: 4,
    episode: 9,
    watchTimeActive: false,
    watchTime: { hours: 2, minutes: 0, seconds: 20 },
    watched: false,
    tagNames: ['mystery', '80s'],
  },
];

describe('SeriesList', () => {
  let component: SeriesList;
  let fixture: ComponentFixture<SeriesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesList],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesList);
    component = fixture.componentInstance;
    component.filterSettings = signal(defaultFilterSettings);
    component.seriesList = signal(exampleSeries);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should filtered series by name correctly', () => {
    fixture.componentRef.setInput('name', 'Bre');

    let correctFilteredSeries = [exampleSeries[0], exampleSeries[2]];
    expect(component.filteredSeries()).toEqual(correctFilteredSeries);

    fixture.componentRef.setInput('name', '');
    correctFilteredSeries = [...exampleSeries];
    expect(component.filteredSeries()).toEqual(correctFilteredSeries);

    fixture.componentRef.setInput('name', 'Test');
    correctFilteredSeries = [exampleSeries[2]];
    expect(component.filteredSeries()).toEqual(correctFilteredSeries);
  });
});
