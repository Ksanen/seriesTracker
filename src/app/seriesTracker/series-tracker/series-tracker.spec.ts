import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesTracker } from './series-tracker';

describe('SeriesTracker', () => {
  let component: SeriesTracker;
  let fixture: ComponentFixture<SeriesTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesTracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesTracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
