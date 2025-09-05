import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesTracker } from './series-tracker';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SeriesTracker', () => {
  let component: SeriesTracker;
  let fixture: ComponentFixture<SeriesTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesTracker],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesTracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
