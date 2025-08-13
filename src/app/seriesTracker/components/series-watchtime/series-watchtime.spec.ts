import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesWatchtime } from './series-watchtime';

describe('SeriesWatchtime', () => {
  let component: SeriesWatchtime;
  let fixture: ComponentFixture<SeriesWatchtime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesWatchtime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesWatchtime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
