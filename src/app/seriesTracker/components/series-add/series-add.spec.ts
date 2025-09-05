import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesAdd } from './series-add';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SeriesAdd', () => {
  let component: SeriesAdd;
  let fixture: ComponentFixture<SeriesAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesAdd],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
