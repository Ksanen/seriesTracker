import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesList } from './series-list';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SeriesInterface } from '../../../shared/interfaces/series';

const series: SeriesInterface[] = [
  {
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
  },
  {
    _id: '2',
    names: ['Jan'],
    type: '',
    genre: '',
    animation: '',
    season: null,
    episode: null,
    watchTimeActive: true,
    watchTime: { hours: 0, minutes: 0, seconds: 20 },
    watched: true,
    tagNames: ['crime', 'drugs'],
  },
  {
    _id: '3',
    names: ['Jan'],
    type: 'movie',
    genre: '',
    animation: '',
    season: null,
    episode: null,
    watchTimeActive: true,
    watchTime: { hours: 0, minutes: 0, seconds: 20 },
    watched: true,
    tagNames: ['crime', 'drugs'],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
