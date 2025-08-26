import { Component } from '@angular/core';
import { SeriesViewService } from '../../services/seriesViewService';

@Component({
  selector: 'series-add-btn',
  imports: [],
  templateUrl: './series-add-btn.html',
  styleUrl: './series-add-btn.css',
})
export class SeriesAddBtn {
  constructor(private view: SeriesViewService) {}
  toggleAddSeriesIsOpen() {
    this.view.toggleAddSeriesForm();
  }
}
