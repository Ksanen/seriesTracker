import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import AppOptions from '../../shared/interfaces/appOptions';
import defaultAppViewOptions from '../../shared/utils/defaultValues/defaultAppViewOptions';

@Injectable({
  providedIn: 'root',
})
export class SeriesViewService {
  private _error$ = new BehaviorSubject<string>('');
  error$ = this._error$.asObservable();
  globalStatusErrors: number[] = [404, 500, 503];
  private _options$ = new BehaviorSubject(defaultAppViewOptions);
  private get currentOptions(): AppOptions {
    return this._options$.getValue();
  }
  options$ = this._options$.asObservable();

  toggleOption<K extends keyof AppOptions>(key: K) {
    const updatedOptions: AppOptions = {
      ...this.currentOptions,
      [key]: !this.currentOptions[key],
    };
    this._options$.next(updatedOptions);
  }
  toggleAddSeriesForm() {
    this.toggleOption('showAddSeriesForm');
    this.toggleOverlay();
  }
  toggleAside() {
    this.toggleOption('showAside');
  }
  toggleOverlay() {
    this.toggleOption('showOverlay');
  }
  toggleShowDeleteSeriesConfirmation() {
    this.toggleOption('showDeleteSeriesConfirmation');
  }
  setError(error: string) {
    this._error$.next(error);
  }
  handleError(response: any) {
    /* sprawdza czy status błędu jest statusem dla którego komunikat zostanie wyświetlony na samej górze aplikacji z pomocą komponentu 'series-error' */
    if (response.status === 0) {
      this.setError('failed to get resources from server');
    } else if (this.globalStatusErrors.includes(response.status)) {
      this.setError(response.error.msg);
    }
    return throwError(() => response);
  }
}
