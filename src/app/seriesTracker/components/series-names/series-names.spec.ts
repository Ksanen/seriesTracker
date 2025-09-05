import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesNames } from './series-names';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SeriesNames', () => {
  let component: SeriesNames;
  let fixture: ComponentFixture<SeriesNames>;

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
});
