import { Component, inject, OnInit, signal } from '@angular/core';
import { SeriesTracker } from './seriesTracker/series-tracker';
import { AppViewService } from './shared/services/app-view-service';

@Component({
  selector: 'app-root',
  imports: [SeriesTracker],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('series-list');
  appView = inject(AppViewService);
  ngOnInit(): void {
    this.appView.initScheme();
  }
}
