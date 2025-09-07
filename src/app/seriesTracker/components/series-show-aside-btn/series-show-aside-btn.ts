import { Component, inject, input } from '@angular/core';
import { SeriesViewService } from '../../services/seriesViewService';

@Component({
  selector: 'series-show-aside-btn',
  imports: [],
  templateUrl: './series-show-aside-btn.html',
  styleUrl: './series-show-aside-btn.css',
})
export class SeriesShowAsideBtn {
  showAside = input.required<boolean>();
  view = inject(SeriesViewService);
  toggleAside() {
    this.view.toggleAside();
  }
}
