import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesList } from './series-list';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SeriesList', () => {
  let component: SeriesList;
  let fixture: ComponentFixture<SeriesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesList],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
