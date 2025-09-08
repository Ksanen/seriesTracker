import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesSearch } from './series-search';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SeriesSearch', () => {
  let component: SeriesSearch;
  let fixture: ComponentFixture<SeriesSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesSearch],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
