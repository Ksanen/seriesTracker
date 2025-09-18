import { Injectable } from '@angular/core';
import { SeriesInterface } from '../../shared/interfaces/series';
import seriesFilterSettings from '../../shared/interfaces/seriesSettings/seriesFilterSettings';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SeriesHelperService {
  filterSeries = (
    series: SeriesInterface,
    settings: seriesFilterSettings,
    nameValue: string
  ) => {
    if (
      nameValue != '' &&
      !series.names.some((name) =>
        name.toLowerCase().includes(nameValue.toLowerCase())
      )
    ) {
      return false;
    }
    if (settings.type !== '' && series.type !== settings.type) return false;
    if (settings.genre !== '' && series.genre !== settings.genre) return false;
    if (settings.animation !== '' && series.animation !== settings.animation)
      return false;
    if (settings.season !== null && series.season !== settings.season)
      return false;
    if (settings.episode !== null && series.episode !== settings.episode)
      return false;
    if (
      settings.tags.length > 0 &&
      !settings.tags.every((tag) => series.tagNames.includes(tag))
    ) {
      return false;
    }
    if (
      settings.watched !== '' &&
      Boolean(Number(settings.watched)) !== series.watched
    )
      return false;
    return true;
  };
  getSpecyficNumberOfSeries(
    seriesList: SeriesInterface[],
    numberOfSeriesToGet: number
  ) {
    return seriesList.slice(0, numberOfSeriesToGet);
  }
  isFormValid(form: FormGroup) {
    if (form.invalid) {
      return false;
    }
    return true;
  }
  createUniqueId(idOfNames: number[]) {
    let id = Math.floor(Math.random() * 1000);
    while (idOfNames.includes(id)) {
      console.log(id);
      id = Math.floor(Math.random() * 1000);
    }
    return id;
  }
}
