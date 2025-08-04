import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesSearch } from './series-search';

describe('SeriesSearch', () => {
  let component: SeriesSearch;
  let fixture: ComponentFixture<SeriesSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
