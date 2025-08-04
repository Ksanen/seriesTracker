import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesControls } from './series-controls';

describe('SeriesControls', () => {
  let component: SeriesControls;
  let fixture: ComponentFixture<SeriesControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
