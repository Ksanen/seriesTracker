import {
  Component,
  computed,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { SeriesInterface } from '../../../shared/interfaces/series';
import { Series } from '../series/series';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeriesSettingsService } from '../../services/seriesSettingsService';
import seriesFilterSettings from '../../../shared/interfaces/seriesSettings/seriesFilterSettings';
@Component({
  selector: 'series-list',
  imports: [Series],
  standalone: true,
  templateUrl: './series-list.html',
  styleUrl: './series-list.css',
})
export class SeriesList implements OnInit {
  @Input() name: Signal<string> = signal('');
  destroyRef = inject(DestroyRef);
  seriesList: WritableSignal<SeriesInterface[]> = signal([]);

  settings: WritableSignal<seriesFilterSettings> = signal({
    episode: null,
    season: null,
    genre: '',
    animation: '',
    tags: [],
    type: '',
    watched: '',
  });
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
    return this.seriesList().filter((series) => {
      if (
        !series.names.some((name) => name.toLowerCase().includes(nameValue))
      ) {
        return false;
      }
      if (settings.type !== '' && series.type !== settings.type) return false;
      if (settings.genre !== '' && series.genre !== settings.genre)
        return false;
      if (settings.animation !== '' && series.animation !== settings.animation)
        return false;
      if (settings.season !== null && series.season !== settings.season)
        return false;
      if (settings.episode !== null && series.episode !== settings.episode)
        return false;
      if (
        settings.tags.length > 0 &&
        !settings.tags.every((tag) => series.tagNames.includes(tag))
      ) {
        return false;
      }
      if (
        settings.watched !== '' &&
        Boolean(Number(settings.watched)) !== series.watched
      )
        return false;
      return true;
    });
  });
}
