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
import SeriesInterface from '../../../shared/interfaces/series';
import { Series } from '../series/series';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  constructor(private store: SeriesStoreService) {}
  ngOnInit(): void {
    this.store.getAllSeries();
    this.store.seriesList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((series) => {
        this.seriesList.set(series);
      });
  }
  filteredSeries = computed(() => {
    const nameValue = this.name().toLowerCase();
    return this.seriesList().filter((series) => {
      return series.name.toLowerCase().includes(nameValue);
    });
  });
}
