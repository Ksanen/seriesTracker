import { Component, input } from '@angular/core';
import { SeriesViewService } from '../../services/seriesViewService';

@Component({
  selector: 'series-show-aside-btn',
  imports: [],
  templateUrl: './series-show-aside-btn.html',
  styleUrl: './series-show-aside-btn.css',
})
export class SeriesShowAsideBtn {
  showAside = input.required<boolean>();
  constructor(private view: SeriesViewService) {}
  toggleAside() {
    this.view.toggleAside();
  }
}
