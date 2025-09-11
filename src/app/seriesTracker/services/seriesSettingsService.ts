import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import seriesFilterSettings from '../../shared/interfaces/seriesSettings/seriesFilterSettings';
import seriesViewSettings from '../../shared/interfaces/seriesSettings/seriesViewSettings';
import defaultViewSettings from '../../shared/utils/defaultValues/defaultViewSettings';
import defaultFilterSettings from '../../shared/utils/defaultValues/defaultFilterSettings';
import { environment } from '../../../environments/environment';
import { SeriesViewService } from './seriesViewService';
import { SeriesApiService } from './seriesApiService';
@Injectable({
  providedIn: 'root',
})
export class SeriesSettingsService {
  private _viewSettings$ = new BehaviorSubject<seriesViewSettings>(
    defaultViewSettings
  );
  private _filterSettings$ = new BehaviorSubject<seriesFilterSettings>(
    defaultFilterSettings
  );
  viewSettings$ = this._viewSettings$.asObservable();
  filterSettings$ = this._filterSettings$.asObservable();
  constructor(private view: SeriesViewService, private api: SeriesApiService) {
    this.getViewSettings();
  }
  getViewSettings() {
    this.api
      .getViewSettings()
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
    this.api
      .saveViewSettings(viewSettings)
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
