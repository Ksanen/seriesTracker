import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesFilter } from './series-filter';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SeriesFilter', () => {
  let component: SeriesFilter;
  let fixture: ComponentFixture<SeriesFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesFilter],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
