import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import seriesFilterSettings from '../../shared/interfaces/seriesSettings/seriesFilterSettings';
import seriesViewSettings from '../../shared/interfaces/seriesSettings/seriesViewSettings';
import { SeriesViewService } from './seriesViewService';
import defaultViewSettings from '../../shared/utils/defaultViewSettings';
import defaultFilterSettings from '../../shared/utils/defaultFilterSettings';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SeriesSettingsService {
  private apiUrl = environment.apiUrl;
  private _viewSettings$ = new BehaviorSubject<seriesViewSettings>(
    defaultViewSettings
  );
  private _filterSettings$ = new BehaviorSubject<seriesFilterSettings>(
    defaultFilterSettings
  );
  viewSettings$ = this._viewSettings$.asObservable();
  filterSettings$ = this._filterSettings$.asObservable();
  constructor(private http: HttpClient, private view: SeriesViewService) {
    this.getFilterSettings();
    this.getViewSettings();
  }
  getViewSettings() {
    this.http
      .get<seriesViewSettings>(`${this.apiUrl}/api/series/settings/view`)
      .subscribe({
        next: (settings) => {
          this._viewSettings$.next(settings);
        },
        error: (error) => {
          switch (error.status) {
            case 503:
              this.view.showDatabaseError();
              break;
          }
          console.log('getting view settings failed');
        },
      });
  }
  getFilterSettings() {
    this.http
      .get<seriesFilterSettings>(`${this.apiUrl}/api/series/settings/filter`)
      .subscribe({
        next: (settings) => {
          this._filterSettings$.next(settings);
        },
        error: (error) => {
          switch (error.status) {
            case 503:
              this.view.showDatabaseError();
              break;
          }
          console.log('getting filter settings failed');
        },
      });
  }
  saveViewSettings(viewSettings: seriesViewSettings) {
    this.http
      .post(`${this.apiUrl}/api/series/settings/view`, viewSettings)
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
      .post(`${this.apiUrl}/api/series/settings/filter`, filterSettings)
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
