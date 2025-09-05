import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesForm } from './series-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SeriesForm', () => {
  let component: SeriesForm;
  let fixture: ComponentFixture<SeriesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesForm],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('even', true);
    fixture.componentRef.setInput('series', {
      _id: 'test',
      names: ['test1', 'test2'],
      type: 'movie',
      genre: '',
      animation: 'cartoon',
      season: 1,
      episode: 2,
      watchTimeActive: true,
      watchTime: {
        hours: 1,
        minutes: 1,
        seconds: 1,
      },
      watched: true,
      tagNames: [],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
