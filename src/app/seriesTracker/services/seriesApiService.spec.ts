import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { SeriesApiService } from './seriesApiService';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SeriesInterface } from '../../shared/interfaces/series';

describe('SeriesApiService', () => {
  let service: SeriesApiService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SeriesApiService);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getting all series', () => {
    const mockSeries: SeriesInterface[] = [
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
    ];

    service.getAllSeries().subscribe((series) => {
      expect(Array.isArray(series)).toBeTrue();
      expect(series.length).toBe(mockSeries.length);
      expect(series).toEqual(mockSeries);
    });
    const httpRequest = httpController.expectOne(
      `${environment.apiUrl}/api/series`
    );
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(mockSeries);
  });
});
