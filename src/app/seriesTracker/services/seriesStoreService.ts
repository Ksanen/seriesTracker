import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import SeriesInterface from '../../shared/interfaces/series';
import { SeriesApiService } from './seriesApiService';
@Injectable({
  providedIn: 'root',
})
export class SeriesStoreService {
  private _seriesList$ = new BehaviorSubject<SeriesInterface[]>([]);
  seriesList$ = this._seriesList$.asObservable();

  constructor(private seriesApiService: SeriesApiService) {}
  getAllSeries() {
    this.seriesApiService.getAllSeries().subscribe({
      next: (series) => {
        this._seriesList$.next(series);
      },
    });
  }
  deleteSeries(id: string) {
    this.seriesApiService.deleteSeries(id).subscribe({
      next: () => {
        let currentList = this._seriesList$.getValue();
        currentList = currentList.filter((series) => series._id !== id);
        this._seriesList$.next(currentList);
      },
      error: (err) => console.log(err),
    });
  }
}
