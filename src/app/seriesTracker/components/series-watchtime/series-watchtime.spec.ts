import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesWatchtime } from './series-watchtime';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WatchTimeForm } from '../../../shared/interfaces/watchTimeForm';
import defaultWatchTime from '../../../shared/utils/defaultValues/defaultWatchTimeValues';

describe('SeriesWatchtime', () => {
  let component: SeriesWatchtime;
  let fb: FormBuilder;
  let fixture: ComponentFixture<SeriesWatchtime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesWatchtime],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesWatchtime);
    component = fixture.componentInstance;
    const formGroup = new FormGroup<WatchTimeForm>({
      hours: new FormControl<number>(0),
      minutes: new FormControl<number>(0),
      seconds: new FormControl<number>(0),
    });
    fixture.componentRef.setInput('form', formGroup);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call patchValue with defaultWatchTime', () => {
    spyOn(component.form(), 'patchValue');
    component.resetWatchTime();
    expect(component.form().patchValue).toHaveBeenCalledWith(defaultWatchTime);
  });
  it('should reset values', () => {
    component.form().patchValue({
      hours: 15,
      minutes: 20,
      seconds: 30,
    });
    component.resetWatchTime();
    expect(component.form().value).toEqual(defaultWatchTime);
  });
});
