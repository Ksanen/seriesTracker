import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SeriesInterface, SeriesToSend } from '../../shared/interfaces/series';
import { SeriesApiService } from './seriesApiService';
import Tag from '../../shared/interfaces/tag';
import defaultGenres from '../../shared/utils/defaultValues/defaultGenre';
import defaultTypes from '../../shared/utils/defaultValues/defaultTypes';
import defaultAnimations from '../../shared/utils/defaultValues/defaultAnimations';
@Injectable({
  providedIn: 'root',
})
export class SeriesStoreService {
  private _seriesList$ = new BehaviorSubject<SeriesInterface[]>([]);
  seriesList$ = this._seriesList$.asObservable();
  private _genreList$ = new BehaviorSubject<string[]>(defaultGenres);
  genreList$ = this._genreList$.asObservable();
  private _typeList$ = new BehaviorSubject<string[]>(defaultTypes);
  typeList$ = this._typeList$.asObservable();
  private _animationList$ = new BehaviorSubject<string[]>(defaultAnimations);
  animationList$ = this._animationList$.asObservable();
  private _possibleTags$ = new BehaviorSubject<Tag[]>([]);
  possibleTags = this._possibleTags$.asObservable();
  #idOfSeriesToDelete: string = '';
  constructor(private seriesApiService: SeriesApiService) {
    this.getAllSeries();
    this.getTags();
  }
  getTags() {
    this.seriesApiService.getTags().subscribe({
      next: (tags) => {
        this._possibleTags$.next(tags);
      },
    });
  }
  getAllSeries() {
    this.seriesApiService.getAllSeries().subscribe({
      next: (series) => {
        this._seriesList$.next(series);
      },
    });
  }
  set idOfSeriesToDelete(id: string) {
    this.#idOfSeriesToDelete = id;
  }
  deleteSeries() {
    this.seriesApiService.deleteSeries(this.#idOfSeriesToDelete).subscribe({
      next: () => {
        let currentList = this._seriesList$.getValue();
        currentList = currentList.filter(
          (series) => series._id !== this.#idOfSeriesToDelete
        );
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
          this.getTags();
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
  addTag(tagName: string) {
    this.seriesApiService.addTag(tagName).subscribe({
      next: () => {
        const tags = this._possibleTags$.getValue();
        tags.push({
          name: tagName,
          seriesAttached: [],
        });
        this._possibleTags$.next(tags);
      },
    });
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
      error: (e) => {
        console.log('error: ', e);
      },
    });
  }
}
