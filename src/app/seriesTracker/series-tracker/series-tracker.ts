import { Component, signal, WritableSignal } from '@angular/core';
import { SeriesSearch } from '../components/series-search/series-search';
import { SeriesList } from '../components/series-list/series-list';
import { SeriesAdd } from '../components/series-add/series-add';
import { CommonModule } from '@angular/common';
import { SeriesControls } from '../components/series-controls/series-controls';
@Component({
  selector: 'series-tracker',
  imports: [SeriesSearch, SeriesList, SeriesAdd, CommonModule, SeriesControls],
  standalone: true,
  templateUrl: './series-tracker.html',
  styleUrl: './series-tracker.css',
})
export class SeriesTracker {
  name: WritableSignal<string> = signal('');
  addSeriesIsOpen: boolean = false;
  toggleAddSeriesIsOpen() {
    this.addSeriesIsOpen = !this.addSeriesIsOpen;
  }
}
