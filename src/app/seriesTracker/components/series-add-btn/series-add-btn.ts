import { Component, inject } from '@angular/core';
import { SeriesViewService } from '../../services/seriesViewService';

@Component({
  selector: 'series-add-btn',
  imports: [],
  templateUrl: './series-add-btn.html',
  styleUrl: './series-add-btn.css',
})
export class SeriesAddBtn {
  view = inject(SeriesViewService);
  toggleAddSeriesIsOpen() {
    this.view.toggleAddSeriesForm();
  }
}
