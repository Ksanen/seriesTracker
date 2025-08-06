import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import seriesFilterSettings from '../../shared/interfaces/seriesSettings/seriesFilterSettings';
import seriesViewSettings from '../../shared/interfaces/seriesSettings/seriesViewSettings';
@Injectable({
  providedIn: 'root',
})
export class SeriesSettingsService {
  private defaultViewSettings: seriesViewSettings = {
    name: true,
    season: true,
    episode: true,
    watched: true,
    watchtime: true,
    type: true,
    genre: true,
    tags: true,
  };
  private defaultFilterSettings: seriesFilterSettings = {
    type: '',
    genre: '',
    watched: '',
    tags: [],
    season: '',
    episode: '',
  };
  private _viewSettings$ = new BehaviorSubject<seriesViewSettings>(
    this.defaultViewSettings
  );
  private _filterSettings$ = new BehaviorSubject<seriesFilterSettings>(
    this.defaultFilterSettings
  );
  viewSettings$ = this._viewSettings$.asObservable();
  filterSettings$ = this._filterSettings$.asObservable();
  constructor(private http: HttpClient) {
    this.getFilterSettings();
    this.getViewSettings();
  }
  getViewSettings() {
    this.http
      .get<seriesViewSettings>('http://localhost:3000/api/series/settings/view')
      .subscribe({
        next: (settings) => {
          this._viewSettings$.next(settings);
        },
        error: (error) => {
          console.log('getting view settings failed', error);
        },
      });
  }
  getFilterSettings() {
    this.http
      .get<seriesFilterSettings>(
        'http://localhost:3000/api/series/settings/view'
      )
      .subscribe({
        next: (settings) => {
          this._filterSettings$.next(settings);
        },
        error: (error) => {
          console.log('getting view settings failed', error);
        },
      });
  }
  saveViewSettings(viewSettings: seriesViewSettings) {
    this.http
      .post('http://localhost:3000/api/series/settings/view', viewSettings)
      .subscribe({
        next: () => {
          this._viewSettings$.next(viewSettings);
        },
        error: (error) => {
          console.log('saving failed', error);
        },
      });
  }
  saveFilterSettings(filterSettings: seriesFilterSettings) {
    this.http
      .post('http://localhost:3000/api/series/settings/filter', filterSettings)
      .subscribe({
        next: () => {
          this._filterSettings$.next(filterSettings);
        },
        error: (error) => {
          console.log('saving failed', error);
        },
      });
  }
}
