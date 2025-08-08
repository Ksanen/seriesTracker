import { computed, Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import AppOptions from '../shared/interfaces/appOptions';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _options$ = new BehaviorSubject({
    showOverlay: false,
    showAddSeriesForm: false,
    showAside: false,
  });
  private get currentOptions(): AppOptions {
    return this._options$.getValue();
  }
  options$ = this._options$.asObservable();
  toggleAddSeriesForm() {
    const updatedOptions: AppOptions = {
      ...this.currentOptions,
      showAddSeriesForm: !this.currentOptions.showAddSeriesForm,
      showOverlay: !this.currentOptions.showOverlay,
    };
    this._options$.next(updatedOptions);
  }
  toggleAside() {
    const updatedOptions: AppOptions = {
      ...this.currentOptions,
      showAside: !this.currentOptions.showAside,
    };
    this._options$.next(updatedOptions);
  }
  toggleOverlay() {
    const updatedOptions: AppOptions = {
      ...this.currentOptions,
      showOverlay: !this.currentOptions.showOverlay,
    };
    this._options$.next(updatedOptions);
  }
}
