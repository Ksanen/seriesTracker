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
  it('should update name after text was written', () => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('.search');
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    expect(component.name()).toEqual('test');
  });
});
