import { Component, signal, WritableSignal } from '@angular/core';
import { SeriesSearch } from '../components/series-search/series-search';
import { SeriesList } from '../components/series-list/series-list';
import { SeriesAdd } from '../components/series-add/series-add';
import { CommonModule } from '@angular/common';
import { SeriesViewSettings } from '../components/series-view-settings/series-view-settings';
import { SeriesFilter } from '../components/series-filter/series-filter';
import { ChangeDetectorRef } from '@angular/core';
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
export class SeriesTracker {
  name: WritableSignal<string> = signal('');
  addSeriesIsOpen: boolean = false;
  asideIsOpen: boolean = false;
  constructor(private cd: ChangeDetectorRef) {}
  toggleAddSeriesIsOpen() {
    this.addSeriesIsOpen = !this.addSeriesIsOpen;
  }
  toggleAside() {
    this.asideIsOpen = !this.asideIsOpen;
  }
}
