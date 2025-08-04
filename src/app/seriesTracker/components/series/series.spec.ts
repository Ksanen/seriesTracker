import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Series } from './series';

describe('Series', () => {
  let component: Series;
  let fixture: ComponentFixture<Series>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Series]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Series);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
