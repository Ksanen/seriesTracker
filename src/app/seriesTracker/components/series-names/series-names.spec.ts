import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesNames } from './series-names';
import { provideZonelessChangeDetection } from '@angular/core';
import RemovableName from '../../../shared/interfaces/removableName';

describe('SeriesNames', () => {
  let component: SeriesNames;
  let fixture: ComponentFixture<SeriesNames>;
  const names: RemovableName[] = [
    {
      id: 1,
      value: 'test1',
    },
    {
      id: 2,
      value: 'test2',
    },
    {
      id: 3,
      value: 'test3',
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesNames],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesNames);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('removeName should remove name', () => {
    component.names.set(names);
    component.removeName(2);
    const correctNamesAfterRemoval = [names[0], names[2]];
    expect(component.names()).toEqual(correctNamesAfterRemoval);
  });
  it('addNewName should add a new name', () => {
    component.addNewName();
    expect(component.names().length).toBe(1);
  });
  it('new name should have empty value', () => {
    component.addNewName();
    expect(component.names()[0].value).toBe('');
  });
  it('names() should not be empty when seriesName array length is greater than 0', () => {
    fixture = TestBed.createComponent(SeriesNames);
    fixture.componentRef.setInput('namesExcludingFirst', ['Jan', 'Adam']);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.names().length).not.toBe(0);
  });
});
