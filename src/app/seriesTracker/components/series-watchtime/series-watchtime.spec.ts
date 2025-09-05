import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesWatchtime } from './series-watchtime';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    const formGroup = new FormGroup({
      hours: new FormControl(0),
      minutes: new FormControl(0),
      seconds: new FormControl(0),
    });
    fixture.componentRef.setInput('form', formGroup);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
