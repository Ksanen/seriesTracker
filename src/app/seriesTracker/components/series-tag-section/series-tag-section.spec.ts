import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesTagSection } from './series-tag-section';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SeriesTagSection', () => {
  let component: SeriesTagSection;
  let fixture: ComponentFixture<SeriesTagSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesTagSection],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesTagSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call deleteTag method', () => {
    spyOn(component.store, 'deleteTag');
    component.delete('test');
    expect(component.store.deleteTag).toHaveBeenCalled();
  });
});
