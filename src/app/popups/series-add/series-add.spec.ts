import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesAdd } from './series-add';

describe('SeriesAdd', () => {
  let component: SeriesAdd;
  let fixture: ComponentFixture<SeriesAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
