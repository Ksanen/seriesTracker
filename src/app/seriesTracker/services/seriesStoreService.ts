import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { SeriesInterface, SeriesToSend } from '../../shared/interfaces/series';
import { SeriesApiService } from './seriesApiService';
import Tag from '../../shared/interfaces/tag';
import defaultGenres from '../../shared/utils/defaultValues/defaultGenre';
import defaultTypes from '../../shared/utils/defaultValues/defaultTypes';
import defaultAnimations from '../../shared/utils/defaultValues/defaultAnimations';
import { SeriesViewService } from './seriesViewService';
@Injectable({
  providedIn: 'root',
})
export class SeriesStoreService {
  private _seriesList$ = new BehaviorSubject<SeriesInterface[]>([]);
  private _genreList$ = new BehaviorSubject<string[]>(defaultGenres);
  private _typeList$ = new BehaviorSubject<string[]>(defaultTypes);
  private _animationList$ = new BehaviorSubject<string[]>(defaultAnimations);
  private _possibleTags$ = new BehaviorSubject<Tag[]>([]);
  private idOfSeriesToDelete: string = '';
  seriesList$ = this._seriesList$.asObservable();
  genreList$ = this._genreList$.asObservable();
  typeList$ = this._typeList$.asObservable();
  animationList$ = this._animationList$.asObservable();
  possibleTags = this._possibleTags$.asObservable();
  constructor(
    private seriesApiService: SeriesApiService,
    private view: SeriesViewService
  ) {
    this.getAllSeries();
    this.getTags();
  }
  getTags() {
    this.seriesApiService
      .getTags()
      .pipe(catchError((error) => this.view.handleError(error)))
      .subscribe({
        next: (tags) => {
          this._possibleTags$.next(tags);
        },
      });
  }
  getAllSeries() {
    this.seriesApiService
      .getAllSeries()
      .pipe(catchError((error) => this.view.handleError(error)))
      .subscribe({
        next: (series) => {
          this._seriesList$.next(series);
        },
      });
  }
  setIdOfSeriesToDelete(id: string) {
    this.idOfSeriesToDelete = id;
  }
  deleteSeries() {
    this.seriesApiService
      .deleteSeries(this.idOfSeriesToDelete)
      .pipe(catchError((error) => this.view.handleError(error)))
      .subscribe({
        next: () => {
          let currentList = this._seriesList$.getValue();
          currentList = currentList.filter(
            (series) => series._id !== this.idOfSeriesToDelete
          );
          this._seriesList$.next(currentList);
          this.getTags();
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
      catchError((error) => this.view.handleError(error))
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
      catchError((error) => this.view.handleError(error))
    );
  }
  deleteTag(tagName: string) {
    this.seriesApiService
      .deleteTag(tagName)
      .pipe(catchError((error) => this.view.handleError(error)))
      .subscribe({
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
      });
  }
  updateSeries(id: string, series: SeriesToSend) {
    return this.seriesApiService
      .update(id, series)
      .pipe(catchError((error) => this.view.handleError(error)));
  }
}
