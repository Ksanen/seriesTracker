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
  it('updateNamesValues should emit correct values', () => {
    spyOn(component.namesValues, 'emit');
    component.names.set(names);
    component.updateNamesValues();
    expect(component.namesValues.emit).toHaveBeenCalledWith([
      'test1',
      'test2',
      'test3',
    ]);
  });
  it('names() should be an empty array when length of seriesNames is less than 2', () => {
    fixture = TestBed.createComponent(SeriesNames);
    fixture.componentRef.setInput('seriesNames', ['Jan']);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.names()).toEqual([]);
  });
  it('names() should not be empty when seriesName array length is greater than 1', () => {
    fixture = TestBed.createComponent(SeriesNames);
    fixture.componentRef.setInput('seriesNames', ['Jan', 'Adam']);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.names().length).not.toBe(0);
  });
  it('names() length should be equal to 2 when seriesName array length is 3', () => {
    fixture = TestBed.createComponent(SeriesNames);
    fixture.componentRef.setInput('seriesNames', ['Jan', 'Adam', 'Anna']);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.names().length).toBe(2);
  });
  it('names() should exclude first name', () => {
    fixture = TestBed.createComponent(SeriesNames);
    fixture.componentRef.setInput('seriesNames', ['Jan', 'Adam', 'Anna']);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(
      component.names().every((removableName) => removableName.value !== 'Jan')
    ).toBe(true);
  });
});
