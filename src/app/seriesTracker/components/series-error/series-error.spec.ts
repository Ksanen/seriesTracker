import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesError } from './series-error';
import { provideZonelessChangeDetection, signal } from '@angular/core';

describe('SeriesError', () => {
  let component: SeriesError;
  let fixture: ComponentFixture<SeriesError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesError],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show error in template after error was updated', () => {
    const p: HTMLElement = fixture.nativeElement.querySelector('.error');
    expect(p.textContent).toEqual('');
    component.view.setError('error');
    fixture.detectChanges();
    expect(p.textContent).toEqual('error');
  });
});
