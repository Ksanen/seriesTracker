import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeriesTracker } from './seriesTracker/series-tracker/series-tracker';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SeriesTracker],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('series-list');
}
