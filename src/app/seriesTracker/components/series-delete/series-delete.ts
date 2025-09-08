import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { SeriesViewService } from '../../services/seriesViewService';
import { SeriesStoreService } from '../../services/seriesStoreService';
@Component({
  selector: 'series-delete',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './series-delete.html',
  styleUrl: './series-delete.css',
})
export class SeriesDelete {
  show = input<boolean>(false);
  store = inject(SeriesStoreService);
  view = inject(SeriesViewService);
  delete() {
    this.store.deleteSeries();
    this.hideConfirmationPopUp();
  }
  cancel() {
    this.store.setIdOfSeriesToDelete('');
    this.hideConfirmationPopUp();
  }
  hideConfirmationPopUp() {
    this.view.toggleOverlay();
    this.view.toggleShowDeleteSeriesConfirmation();
  }
}
