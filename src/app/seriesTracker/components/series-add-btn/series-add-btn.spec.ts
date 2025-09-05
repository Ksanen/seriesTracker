import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesAddBtn } from './series-add-btn';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SeriesAddBtn', () => {
  let component: SeriesAddBtn;
  let fixture: ComponentFixture<SeriesAddBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesAddBtn],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesAddBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
