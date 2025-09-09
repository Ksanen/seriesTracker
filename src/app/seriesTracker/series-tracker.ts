import {
  Component,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SeriesSearch } from './components/series-search/series-search';
import { SeriesViewSettings } from './components/series-view-settings/series-view-settings';
import { SeriesFilter } from './components/series-filter/series-filter';
import AppOptions from './../shared/interfaces/appOptions';
import { SeriesDelete } from './components/series-delete/series-delete';
import { SeriesViewService } from './services/seriesViewService';
import { SeriesTagSection } from './components/series-tag-section/series-tag-section';
import { CommonModule } from '@angular/common';
import { SeriesError } from './components/series-error/series-error';
import { Aside } from '../shared/components/aside/aside';
import { SeriesAddBtn } from './components/series-add-btn/series-add-btn';
import { SeriesShowAsideBtn } from './components/series-show-aside-btn/series-show-aside-btn';
import { DarkModeBtn } from '../shared/components/dark-mode-btn/dark-mode-btn';
import { SeriesAdd } from './components/series-add/series-add';
import { SeriesContentList } from './components/series-content-list/series-content-list';
import defaultAppViewOptions from '../shared/utils/defaultValues/defaultAppViewOptions';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'series-tracker',
  imports: [
    SeriesSearch,
    SeriesAdd,
    CommonModule,
    SeriesViewSettings,
    SeriesFilter,
    SeriesDelete,
    SeriesTagSection,
    SeriesError,
    Aside,
    SeriesAddBtn,
    SeriesShowAsideBtn,
    DarkModeBtn,
    SeriesContentList,
  ],
  standalone: true,
  templateUrl: './series-tracker.html',
  styleUrl: './series-tracker.css',
})
export class SeriesTracker {
  name: WritableSignal<string> = signal('');
  view = inject(SeriesViewService);
  options: Signal<AppOptions> = toSignal(this.view.options$, {
    initialValue: defaultAppViewOptions,
  });
}
