import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesTagSection } from './series-tag-section';

describe('SeriesTagSection', () => {
  let component: SeriesTagSection;
  let fixture: ComponentFixture<SeriesTagSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesTagSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesTagSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
