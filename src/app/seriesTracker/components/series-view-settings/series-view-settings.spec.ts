import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesViewSettings } from './series-view-settings';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SeriesViewSettings', () => {
  let component: SeriesViewSettings;
  let fixture: ComponentFixture<SeriesViewSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesViewSettings],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesViewSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
