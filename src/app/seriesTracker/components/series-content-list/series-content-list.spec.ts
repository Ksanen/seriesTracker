import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesContentList } from './series-content-list';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SeriesContentList', () => {
  let component: SeriesContentList;
  let fixture: ComponentFixture<SeriesContentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesContentList],
      providers: [
        provideZonelessChangeDetection(),

        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesContentList);
    fixture.componentRef.setInput('name', 'test');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('showScrollUp should be set to false when scrollTop is 0', () => {
    component.hostElement.nativeElement.scrollTop = 0;
    component.showArrowContainer = true;
    component.onScroll(new Event('scroll'));
    expect(component.showArrowContainer).toBe(false);
  });
  it('expect arrowContainer to be defined', () => {
    expect(component.arrowContainer).toBeDefined();
  });
  it('expect topValue to be 30', () => {
    const value = component.calculateTopValue(20);
    expect(value).toBe('30px');
  });
});
