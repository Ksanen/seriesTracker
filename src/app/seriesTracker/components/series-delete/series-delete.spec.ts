import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDelete } from './series-delete';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SeriesDelete', () => {
  let component: SeriesDelete;
  let fixture: ComponentFixture<SeriesDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesDelete],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
