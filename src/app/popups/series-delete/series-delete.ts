import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../services/app-service';
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
  constructor(private store: SeriesStoreService, private app: AppService) {}
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
    this.app.toggleOverlay();
    this.app.toggleShowDeleteSeriesConfirmation();
  }
}
