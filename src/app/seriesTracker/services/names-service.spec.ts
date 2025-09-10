import { TestBed } from '@angular/core/testing';
import { NamesService } from './names-service';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import defaultSeriesForm from '../../shared/utils/forms/defaultSeriesForm';
import RemovableName from '../../shared/interfaces/removableName';

describe('NamesService', () => {
  let service: NamesService;
  let fb: FormBuilder;
  const removableNames: RemovableName[] = [
    {
      id: 1,
      value: 'Jan',
    },
    {
      id: 2,
      value: 'test',
    },
    { id: 3, value: 'test2' },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), FormBuilder],
    });
    service = TestBed.inject(NamesService);
    fb = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getRemovableNamesValues should get correct values', () => {
    const values = service.getRemovableNamesValues(removableNames);
    expect(values).toEqual(['Jan', 'test', 'test2']);
  });
  it('getRemovableNamesId should get correct id', () => {
    const values = service.getRemovableNamesId(removableNames);
    expect(values).toEqual([1, 2, 3]);
  });
  it('should remove name from array', () => {
    const result = service.removeName(removableNames, 1);
    expect(result).toEqual([
      {
        id: 2,
        value: 'test',
      },
      {
        id: 3,
        value: 'test2',
      },
    ]);
  });
  it('should create removableNames', () => {
    const removableNames = service.createRemovableNamesArray(['jan', 'Adam']);
    expect(removableNames[0].value).toBe('jan');
    expect(removableNames[1].value).toBe('Adam');
    expect(removableNames[0].id).toBeInstanceOf(Number);
    expect(removableNames[1].id).toBeInstanceOf(Number);
    expect(removableNames.length).toBe(2);
  });
  it('removeWhiteSpaces should remove white spaces', () => {
    const array = [' jan', 'a ', '  test '];
    const removedWhiteSpaces = service.removeWhiteSpacesFromNames(array);
    expect(removedWhiteSpaces).toEqual(['jan', 'a', 'test']);
  });
  it('removeUnnecessaryNames should remove unnecessary names', () => {
    const names = ['jan', 'adam', 'jan', 'marek', 'adam', 'john'];
    const namesAfter = service.removeUnnecessaryNames(names);
    expect(namesAfter).toEqual(['jan', 'adam', 'marek', 'john']);
  });
  it('createRemovableName should create new name', () => {
    const names: RemovableName[] = [
      {
        id: 1,
        value: 'jan',
      },
    ];
    const idOfNames = service.getRemovableNamesId(names);
    names.push(service.createRemovableName(idOfNames));
    expect(names.length).toBe(2);
  });
  it('newRemovableName`s value should be empty', () => {
    const names = [
      {
        id: 1,
        value: 'jan',
      },
    ];
    const idOfNames = service.getRemovableNamesId(names);
    names.push(service.createRemovableName(idOfNames));
    expect(names[1].value).toBe('');
  });
  it('createNamesToSubmit should return main name and others names in an an array', () => {
    const form = fb.group(defaultSeriesForm);
    form.controls['name'].setValue('test1');
    let names = ['test2', 'test3'];
    let namesToSubmit = service.createNamesToSubmit(form, names);
    expect(namesToSubmit).toEqual(['test1', 'test2', 'test3']);
  });
  it('createNamesToSubmit should call removeWhiteSpaces and removeUnnecessaryNames  methods', () => {
    const form = fb.group(defaultSeriesForm);
    form.controls['name'].setValue('test1');
    let names = ['test2', 'test3'];
    spyOn(service, 'removeWhiteSpacesFromNames').and.callThrough();
    spyOn(service, 'removeUnnecessaryNames').and.callThrough();
    service.createNamesToSubmit(form, names);
    expect(service.removeWhiteSpacesFromNames).toHaveBeenCalledTimes(1);
    expect(service.removeUnnecessaryNames).toHaveBeenCalledTimes(1);
  });
  it("canCreateRemovableName should return false,when last element's value is empty", () => {
    const testRemovableNames = structuredClone(removableNames);
    testRemovableNames[testRemovableNames.length - 1].value = '';
    const result = service.canCreateNewRemovableName(testRemovableNames);
    expect(result).toBe(false);
  });
  it("canCreateRemovableName should return true,when last element's value is not empty", () => {
    const testRemovableNames = structuredClone(removableNames);
    testRemovableNames[testRemovableNames.length - 1].value = 'tee';
    const result = service.canCreateNewRemovableName(testRemovableNames);
    expect(result).toBe(true);
  });
});
