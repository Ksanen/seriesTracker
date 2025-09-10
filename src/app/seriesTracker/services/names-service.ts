import { inject, Injectable } from '@angular/core';
import RemovableName from '../../shared/interfaces/removableName';
import { FormGroup } from '@angular/forms';
import { SeriesHelperService } from './series-helper-service';

@Injectable({
  providedIn: 'root',
})
export class NamesService {
  helper = inject(SeriesHelperService);
  createNewRemovableName(names: RemovableName[]) {
    if (names.length > 0 && names[names.length - 1].value === '') {
      return names;
    }
    const idOfNames = names.map((name) => name.id);
    const newName: RemovableName = {
      id: this.helper.createUniqueId(idOfNames),
      value: '',
    };
    names.push(newName);
    return names;
  }
  getRemovableNamesValues(names: RemovableName[]) {
    return names.map((name) => name.value);
  }

  createRemovableNamesArray(names: string[]) {
    let removableNames: RemovableName[] = [];
    for (let i = 0; i < names.length; i++) {
      const idOfNames = removableNames.map((name) => name.id);
      let id = this.helper.createUniqueId(idOfNames);
      const newName: RemovableName = {
        id: id,
        value: names[i],
      };
      removableNames.push(newName);
    }
    return removableNames;
  }
  removeName(names: RemovableName[], id: number): RemovableName[] {
    names = names.filter((name) => name.id !== id);
    return names;
  }
  removeWhiteSpacesFromNames(array: string[]) {
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].trim();
    }
    return array;
  }
  removeUnnecessaryNames(names: string[]) {
    const namesSet = new Set(names);
    namesSet.delete('');
    return [...namesSet];
  }
  createNamesToSubmit(form: FormGroup, namesValues: string[]): string[] {
    let names: string[] = this.removeUnnecessaryNames(namesValues);
    names = this.removeWhiteSpacesFromNames(names);
    const namesToSubmit = [form.value.name, ...names];
    return namesToSubmit;
  }
}
