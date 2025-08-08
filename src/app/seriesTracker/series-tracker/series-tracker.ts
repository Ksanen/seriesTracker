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
import { SeriesAdd } from '../components/series-add/series-add';
import { CommonModule } from '@angular/common';
import { SeriesViewSettings } from '../components/series-view-settings/series-view-settings';
import { SeriesFilter } from '../components/series-filter/series-filter';
import { AppService } from '../../services/app-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import AppOptions from '../../shared/interfaces/appOptions';
@Component({
  selector: 'series-tracker',
  imports: [
    SeriesSearch,
    SeriesList,
    SeriesAdd,
    CommonModule,
    SeriesViewSettings,
    SeriesFilter,
  ],
  standalone: true,
  templateUrl: './series-tracker.html',
  styleUrl: './series-tracker.css',
})
export class SeriesTracker implements OnInit {
  name: WritableSignal<string> = signal('');
  destroyRef = inject(DestroyRef);
  options!: AppOptions;
  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.appService.options$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((options) => {
        this.options = options;
      });
  }
  toggleAddSeriesIsOpen() {
    this.appService.toggleAddSeriesForm();
  }
  toggleAside() {
    this.appService.toggleAside();
  }
}
