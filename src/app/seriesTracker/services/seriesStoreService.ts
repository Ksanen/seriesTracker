import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { SeriesInterface, SeriesToSend } from '../../shared/interfaces/series';
import { SeriesApiService } from './seriesApiService';
import Tag from '../../shared/interfaces/tag';
import defaultGenres from '../../shared/utils/defaultValues/defaultGenre';
import defaultTypes from '../../shared/utils/defaultValues/defaultTypes';
import defaultAnimations from '../../shared/utils/defaultValues/defaultAnimations';
import handleError from '../../shared/utils/handleError';
@Injectable({
  providedIn: 'root',
})
export class SeriesStoreService {
  private _seriesList$ = new BehaviorSubject<SeriesInterface[]>([]);
  private _genreList$ = new BehaviorSubject<string[]>(defaultGenres);
  private _typeList$ = new BehaviorSubject<string[]>(defaultTypes);
  private _animationList$ = new BehaviorSubject<string[]>(defaultAnimations);
  private _possibleTags$ = new BehaviorSubject<Tag[]>([]);
  private _error$ = new BehaviorSubject<string>('');
  private idOfSeriesToDelete: string = '';
  seriesList$ = this._seriesList$.asObservable();
  genreList$ = this._genreList$.asObservable();
  typeList$ = this._typeList$.asObservable();
  animationList$ = this._animationList$.asObservable();
  possibleTags = this._possibleTags$.asObservable();
  error$ = this._error$.asObservable();
  constructor(private seriesApiService: SeriesApiService) {
    this.getAllSeries();
    this.getTags();
  }
  getTags() {
    this.seriesApiService.getTags().subscribe({
      next: (tags) => {
        this._possibleTags$.next(tags);
      },
      error: (error) => {
        this.setError(handleError(error));
      },
    });
  }
  getAllSeries() {
    this.seriesApiService.getAllSeries().subscribe({
      next: (series) => {
        this._seriesList$.next(series);
      },
      error: (error) => {
        this.setError(handleError(error));
      },
    });
  }
  setIdOfSeriesToDelete(id: string) {
    this.idOfSeriesToDelete = id;
  }
  deleteSeries() {
    this.seriesApiService.deleteSeries(this.idOfSeriesToDelete).subscribe({
      next: () => {
        let currentList = this._seriesList$.getValue();
        currentList = currentList.filter(
          (series) => series._id !== this.idOfSeriesToDelete
        );
        this._seriesList$.next(currentList);
        this.getTags();
      },
      error: (error) => {
        this.setError(handleError(error));
      },
    });
  }
  addSeries(Series: SeriesToSend) {
    return this.seriesApiService.add(Series).pipe(
      tap((series) => {
        let currentList = this._seriesList$.getValue();
        currentList.push(series);
        this._seriesList$.next(currentList);
        this.getTags();
      }),
      catchError((error) => {
        this.setError(handleError(error));
        return throwError(() => error);
      })
    );
  }
  addTag(tagName: string) {
    return this.seriesApiService.addTag(tagName).pipe(
      tap(() => {
        const tags = this._possibleTags$.getValue();
        tags.push({
          name: tagName,
          seriesAttached: [],
        });
        this._possibleTags$.next(tags);
      }),
      catchError((error) => {
        this.setError(handleError(error));
        return throwError(() => error);
      })
    );
  }
  deleteTag(tagName: string) {
    this.seriesApiService.deleteTag(tagName).subscribe({
      next: (updatedSeries) => {
        /*
        wysyłanie nowej listy tagów po usunięciu tagu
        */
        let tags = this._possibleTags$.getValue();
        tags = tags.filter((tag) => tag.name !== tagName);
        this._possibleTags$.next(tags);

        let currentList = this._seriesList$.getValue();

        /*
          Dla każdej updatowanej serii
           wyszukuje pasującą serię w liście serii
          i przypisuje nowe tagi
        
        */
        updatedSeries.forEach((series) => {
          const id = series._id.toString();
          for (let i = 0; i < currentList.length; i++) {
            if (currentList[i]._id === id) {
              currentList[i].tagNames = series.tagNames;
            }
          }
        });
        this._seriesList$.next(currentList);
      },
      error: (error) => {
        this.setError(handleError(error));
      },
    });
  }
  updateSeries(id: string, series: SeriesToSend) {
    return this.seriesApiService.update(id, series).pipe(
      catchError((error) => {
        this.setError(handleError(error));
        return throwError(() => error);
      })
    );
  }
  setError(error: string) {
    this._error$.next(error);
  }
}
