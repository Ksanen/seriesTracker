import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesNames } from './series-names';

describe('SeriesNames', () => {
  let component: SeriesNames;
  let fixture: ComponentFixture<SeriesNames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesNames],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesNames);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
