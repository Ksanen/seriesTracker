import {
  Component,
  computed,
  Input,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import SeriesInterface from '../../../shared/interfaces/series';
import { Subject } from 'rxjs';
import { Series } from '../series/series';
import { SeriesStoreService } from '../../services/seriesStoreService';
@Component({
  selector: 'series-list',
  imports: [Series],
  standalone: true,
  templateUrl: './series-list.html',
  styleUrl: './series-list.css',
})
export class SeriesList implements OnInit {
  @Input() name: Signal<string> = signal('');
  seriesList: WritableSignal<SeriesInterface[]> = signal([]);
  private readonly destroy$ = new Subject<void>();
  constructor(private store: SeriesStoreService) {}
  ngOnInit(): void {
    this.store.getAllSeries();
    this.store.seriesList$.subscribe((series) => {
      this.seriesList.set(series);
    });
  }
  filteredAnime = computed(() => {
    const nameValue = this.name().toLowerCase();
    return this.seriesList().filter((series) => {
      return series.name.toLowerCase().includes(nameValue);
    });
  });
}
