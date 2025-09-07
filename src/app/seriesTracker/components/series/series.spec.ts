import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Series } from './series';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Series', () => {
  let component: Series;
  let fixture: ComponentFixture<Series>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Series],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Series);
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
  it('should toggle editMode', () => {
    const startIsEditMode = component.isEditMode;
    component.toggleEditMode();
    const endIsEditMode = component.isEditMode;
    expect(endIsEditMode).toBe(!startIsEditMode);
  });
});
