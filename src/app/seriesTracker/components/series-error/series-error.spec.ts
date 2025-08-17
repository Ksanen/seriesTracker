import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesError } from './series-error';

describe('SeriesError', () => {
  let component: SeriesError;
  let fixture: ComponentFixture<SeriesError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
