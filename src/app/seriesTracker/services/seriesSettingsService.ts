import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import seriesFilterSettings from '../../shared/interfaces/seriesSettings/seriesFilterSettings';
import seriesViewSettings from '../../shared/interfaces/seriesSettings/seriesViewSettings';
import defaultViewSettings from '../../shared/utils/defaultValues/defaultViewSettings';
import defaultFilterSettings from '../../shared/utils/defaultValues/defaultFilterSettings';
import { environment } from '../../../environments/environment';
import { SeriesViewService } from './seriesViewService';
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
    this.getViewSettings();
  }
  getViewSettings() {
    this.http
      .get<seriesViewSettings>(`${this.apiUrl}/api/series/settings/view`)
      .pipe(catchError((error) => this.view.handleError(error)))
      .subscribe({
        next: (settings) => {
          this._viewSettings$.next(settings);
        },
        error: () => {
          console.log('getting view settings failed');
        },
      });
  }
  saveViewSettings(viewSettings: seriesViewSettings) {
    this.http
      .post(`${this.apiUrl}/api/series/settings/view`, viewSettings)
      .pipe(catchError((error) => this.view.handleError(error)))
      .subscribe({
        next: () => {
          this._viewSettings$.next(viewSettings);
        },
        error: () => {
          console.log('saving view settings failed');
        },
      });
  }
  updateFilterSettings(filterSettings: seriesFilterSettings) {
    this._filterSettings$.next(filterSettings);
  }
}
