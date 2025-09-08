import { Injectable } from '@angular/core';
import RemovableName from '../../shared/interfaces/removableName';

@Injectable({
  providedIn: 'root',
})
export class NamesService {
  addNewName(names: RemovableName[]) {
    if (names.length > 0 && names[names.length - 1].value === '') {
      return names;
    }
    const idOfNames = names.map((name) => name.id);
    const newName: RemovableName = {
      id: this.createUniqueId(idOfNames),
      value: '',
    };
    names.push(newName);
    return names;
  }
  createUniqueId(idOfNames: number[]) {
    let id = Math.floor(Math.random() * 1000);
    while (idOfNames.includes(id)) {
      console.log(id);
      id = Math.floor(Math.random() * 1000);
    }
    return id;
  }
  createRemovableNamesArray(names: string[]) {
    /*

      tworzy unikalne id dla każdego elementu tablicy names oraz
      ustawia value na wartość elementu names

    */
    let removableNames: RemovableName[] = [];
    for (let i = 0; i < names.length; i++) {
      const idOfNames = removableNames.map((name) => name.id);
      let id = Math.floor(Math.random() * 1000);
      /*
      pętla trwa do czasu do póki id nie będzie  unikalne czyli
       nie będzie znalezione w tablicy id pochodzących
      od nowej tablicy removableNames. Początkowo tablica jest pusta,
      ale w raz z dodawaniem nowych elementów, id mogą się powtórzyć, dlatego
      to ma temu zapobiec.
      */
      while (idOfNames.includes(id)) {
        id = Math.floor(Math.random() * 1000);
      }

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
  removeWhiteSpaces(array: string[]) {
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].trim();
    }
    return array;
  }
  removeUnnecessaryNames(names: string[]) {
    const namesSet = new Set(this.removeWhiteSpaces(names));
    namesSet.delete('');
    return [...namesSet];
  }
}
