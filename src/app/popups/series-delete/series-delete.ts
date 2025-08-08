import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SeriesViewService } from '../../seriesTracker/services/series-view-service';
import { SeriesStoreService } from '../../seriesTracker/services/seriesStoreService';
@Component({
  selector: 'series-delete',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './series-delete.html',
  styleUrl: './series-delete.css',
})
export class SeriesDelete implements OnInit {
  @Input() show!: boolean;
  constructor(
    private store: SeriesStoreService,
    private view: SeriesViewService
  ) {}
  ngOnInit(): void {}
  delete() {
    this.store.deleteSeries();
    this.hideConfirmationPopUp();
  }
  cancel() {
    this.store.idOfSeriesToDelete = '';
    this.hideConfirmationPopUp();
  }
  hideConfirmationPopUp() {
    this.view.toggleOverlay();
    this.view.toggleShowDeleteSeriesConfirmation();
  }
}
