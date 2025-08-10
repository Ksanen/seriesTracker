import { Injectable } from '@angular/core';
import RemovableName from '../../shared/interfaces/removableName';

@Injectable({
  providedIn: 'root',
})
export class NamesService {
  addNewName(names: RemovableName[]) {
    /*
      jeżeli tablica names jest większa od 0 i ostatni element jest pusty,
      to dodanie nowego imienia nie jest możliwe. Zapobiegnie to dodaniu wielu pustych imion.
      Funkcja następnie wybiera unikalne id i dodaje nowe nowę imię z pustą wartością
    */
    if (names.length > 0 && names[names.length - 1].value === '') {
      return;
    }
    const idOfNames = names.map((name) => name.id);
    let id = Math.floor(Math.random() * 1000);
    while (idOfNames.includes(id)) {
      console.log(id);
      id = Math.floor(Math.random() * 1000);
    }
    const newName: RemovableName = {
      id: id,
      value: '',
    };
    return newName;
  }
  createRemovableNamesArray(names: string[]) {
    /*

      tworzy unikalne id dla każdego elementu tablicy names oraz
      ustawia value na wartość elementu names

    */
    let removableNames: RemovableName[] = [];
    for (let i = 1; i < names.length; i++) {
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
  removeName(names: RemovableName[], id: number) {
    names = names.filter((name) => name.id !== id);
    return names;
  }
  removeUnnecessaryNames(names: string[]) {
    const namesSet = new Set(names);
    namesSet.delete('');
    return [...namesSet];
  }
}
