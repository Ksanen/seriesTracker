import { TestBed } from '@angular/core/testing';
import { NamesService } from './names-service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NamesService', () => {
  let service: NamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(NamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should remove name from array', () => {
    const result = service.removeName(
      [
        {
          id: 1,
          value: 'nazwa1',
        },
        {
          id: 2,
          value: 'nazwa2',
        },
      ],
      1
    );
    expect(result).toEqual([
      {
        id: 2,
        value: 'nazwa2',
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
    const removedWhiteSpaces = service.removeWhiteSpaces(array);
    expect(removedWhiteSpaces).toEqual(['jan', 'a', 'test']);
  });
  it('removeUnnecessaryNames should remove unnecessary names', () => {
    const names = ['jan', 'adam', 'jan', 'marek', 'adam', 'john'];
    const namesAfter = service.removeUnnecessaryNames(names);
    expect(namesAfter).toEqual(['jan', 'adam', 'marek', 'john']);
  });
  it('addNewName should add new name', () => {
    const names = [
      {
        id: 1,
        value: 'jan',
      },
    ];
    const newNames = service.addNewName(names);
    expect(newNames.length).toBe(2);
  });
  it('new name should be empty', () => {
    const names = [
      {
        id: 1,
        value: 'jan',
      },
    ];
    const newNames = service.addNewName(names);
    expect(newNames[1].value).toBe('');
  });
  it('new name should not be added when previous name is empty', () => {
    const names = [
      {
        id: 1,
        value: '',
      },
    ];
    const newNames = service.addNewName(names);
    expect(newNames.length).toBe(1);
  });
});
