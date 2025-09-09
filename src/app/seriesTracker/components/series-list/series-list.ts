import { Component, computed, inject, input } from '@angular/core';
import { Series } from '../series/series';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeriesSettingsService } from '../../services/seriesSettingsService';
import defaultFilterSettings from '../../../shared/utils/defaultValues/defaultFilterSettings';
import { Loading } from '../../../shared/components/loading/loading';
import { SeriesHelperService } from '../../services/series-helper-service';
@Component({
  selector: 'series-list',
  imports: [Series, Loading],
  standalone: true,
  templateUrl: './series-list.html',
  styleUrl: './series-list.css',
})
export class SeriesList {
  name = input<string>('');
  store = inject(SeriesStoreService);
  seriesSettings = inject(SeriesSettingsService);
  seriesHelper = inject(SeriesHelperService);
  seriesList = toSignal(this.store.seriesList$, { initialValue: [] });
  filterSettings = toSignal(this.seriesSettings.filterSettings$, {
    initialValue: defaultFilterSettings,
  });
  filteredSeries = computed(() => {
    const nameValue = this.name().toLowerCase();
    const settings = this.filterSettings();
    return this.seriesList().filter((series) =>
      this.seriesHelper.filterSeries(series, settings, nameValue)
    );
  });
}
