import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SeriesInterface } from '../../../shared/interfaces/series';
import { Series } from '../series/series';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeriesSettingsService } from '../../services/seriesSettingsService';
import seriesFilterSettings from '../../../shared/interfaces/seriesSettings/seriesFilterSettings';
import defaultFilterSettings from '../../../shared/utils/defaultValues/defaultFilterSettings';
import filterSeries from '../../../shared/utils/fitlerSeries';
import { Loading } from '../../../shared/components/loading/loading';
@Component({
  selector: 'series-list',
  imports: [Series, Loading],
  standalone: true,
  templateUrl: './series-list.html',
  styleUrl: './series-list.css',
})
export class SeriesList implements OnInit {
  name = input<string>('');
  destroyRef = inject(DestroyRef);
  seriesList: WritableSignal<SeriesInterface[]> = signal([]);
  settings: WritableSignal<seriesFilterSettings> = signal(
    defaultFilterSettings
  );
  constructor(
    private store: SeriesStoreService,
    private seriesSettings: SeriesSettingsService
  ) {}
  ngOnInit(): void {
    this.store.seriesList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((series) => {
        this.seriesList.set([...series]);
      });
    this.seriesSettings.filterSettings$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (settings) => {
          this.settings.set(settings);
        },
      });
  }
  filteredSeries = computed(() => {
    const nameValue = this.name().toLowerCase();
    const settings = this.settings();
    return this.seriesList().filter((series) =>
      filterSeries(series, settings, nameValue)
    );
  });
}
