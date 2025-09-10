import { inject, Injectable } from '@angular/core';
import RemovableName from '../../shared/interfaces/removableName';
import { FormGroup } from '@angular/forms';
import { SeriesHelperService } from './series-helper-service';

@Injectable({
  providedIn: 'root',
})
export class NamesService {
  helper = inject(SeriesHelperService);
  canCreateNewRemovableName(names: RemovableName[]): boolean {
    if (names.length > 0 && names[names.length - 1].value === '') {
      return false;
    }
    return true;
  }
  createRemovableName(idOfNames: number[] = [], value?: string): RemovableName {
    return {
      id: this.helper.createUniqueId(idOfNames),
      value: value ? value : '',
    };
  }
  getRemovableNamesValues(names: RemovableName[]): string[] {
    return names.map((name) => name.value);
  }
  getRemovableNamesId(names: RemovableName[]): number[] {
    return names.map((name) => name.id);
  }
  createRemovableNamesArray(names: string[]): RemovableName[] {
    let removableNames: RemovableName[] = [];
    for (let i = 0; i < names.length; i++) {
      const newName = this.createRemovableName([], names[i]);
      removableNames.push(newName);
    }
    return removableNames;
  }
  removeName(names: RemovableName[], id: number): RemovableName[] {
    names = names.filter((name) => name.id !== id);
    return names;
  }
  removeWhiteSpacesFromNames(array: string[]): string[] {
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].trim();
    }
    return array;
  }
  removeUnnecessaryNames(names: string[]): string[] {
    const namesSet = new Set(names);
    namesSet.delete('');
    return [...namesSet];
  }
  createNamesToSubmit(
    form: FormGroup,
    namesExcludingFirst: string[]
  ): string[] {
    let names: string[] = this.removeUnnecessaryNames(namesExcludingFirst);
    names = this.removeWhiteSpacesFromNames(names);
    let firstName = form.value.name;
    const namesToSubmit = [firstName, ...names];
    return namesToSubmit;
  }
}
