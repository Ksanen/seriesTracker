import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDatabaseError } from './series-database-error';

describe('SeriesDatabaseError', () => {
  let component: SeriesDatabaseError;
  let fixture: ComponentFixture<SeriesDatabaseError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesDatabaseError],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesDatabaseError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
