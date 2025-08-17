import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AppOptions from '../../shared/interfaces/appOptions';

@Injectable({
  providedIn: 'root',
})
export class SeriesViewService {
  private _options$ = new BehaviorSubject({
    showOverlay: false,
    showAddSeriesForm: false,
    showAside: false,
    showDeleteSeriesConfirmation: false,
  });
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
}
