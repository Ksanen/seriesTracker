import { Component, signal } from '@angular/core';
import { SeriesTracker } from './seriesTracker/series-tracker';

@Component({
  selector: 'app-root',
  imports: [SeriesTracker],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('series-list');
}
