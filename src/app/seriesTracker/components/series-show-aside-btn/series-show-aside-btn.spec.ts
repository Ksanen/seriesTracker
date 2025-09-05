import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesShowAsideBtn } from './series-show-aside-btn';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SeriesShowAsideBtn', () => {
  let component: SeriesShowAsideBtn;
  let fixture: ComponentFixture<SeriesShowAsideBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesShowAsideBtn],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesShowAsideBtn);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('showAside', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
