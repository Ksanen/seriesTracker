import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDelete } from './series-delete';

describe('SeriesDelete', () => {
  let component: SeriesDelete;
  let fixture: ComponentFixture<SeriesDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
