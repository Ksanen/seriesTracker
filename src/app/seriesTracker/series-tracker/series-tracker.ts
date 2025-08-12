import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SeriesSearch } from '../components/series-search/series-search';
import { SeriesList } from '../components/series-list/series-list';
import { SeriesAdd } from '../popups/series-add/series-add';
import { CommonModule } from '@angular/common';
import { SeriesViewSettings } from '../components/series-view-settings/series-view-settings';
import { SeriesFilter } from '../components/series-filter/series-filter';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import AppOptions from '../../shared/interfaces/appOptions';
import { SeriesDelete } from '../popups/series-delete/series-delete';
import { SeriesViewService } from '../services/seriesViewService';
import { SeriesDatabaseError } from '../components/series-database-error/series-database-error';
import { SeriesTagSection } from '../components/series-tag-section/series-tag-section';
@Component({
  selector: 'series-tracker',
  imports: [
    SeriesSearch,
    SeriesList,
    SeriesAdd,
    CommonModule,
    SeriesViewSettings,
    SeriesFilter,
    SeriesDelete,
    SeriesDatabaseError,
    SeriesTagSection,
  ],
  standalone: true,
  templateUrl: './series-tracker.html',
  styleUrl: './series-tracker.css',
})
export class SeriesTracker implements OnInit {
  name: WritableSignal<string> = signal('');
  destroyRef = inject(DestroyRef);
  options!: AppOptions;
  constructor(private view: SeriesViewService) {}
  ngOnInit(): void {
    this.view.options$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((options) => {
        this.options = options;
      });
  }
  toggleAddSeriesIsOpen() {
    this.view.toggleAddSeriesForm();
    this.view.toggleOverlay();
  }
  toggleAside() {
    this.view.toggleAside();
  }
}
