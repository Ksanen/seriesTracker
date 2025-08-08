import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import SeriesInterface from '../../shared/interfaces/series';
import { SeriesApiService } from './seriesApiService';
import SeriesToSend from '../../shared/interfaces/seriesToSend';
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
  addSeries(Series: SeriesToSend) {
    this.seriesApiService.add(Series).subscribe({
      next: (response) => {
        if (response.success) {
          let currentList = this._seriesList$.getValue();
          currentList.push(response.series);
          this._seriesList$.next(currentList);
        } else {
          console.log('error1', response);
        }
      },
      error: (e) => {
        switch (e.status) {
          case 400:
            console.log('błąd walidacji');
            break;
          case 500:
            console.log('Internal server error');
            break;
        }
      },
    });
  }
}
