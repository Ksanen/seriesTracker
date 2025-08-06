import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesViewSettings } from './series-view-settings';

describe('SeriesViewSettings', () => {
  let component: SeriesViewSettings;
  let fixture: ComponentFixture<SeriesViewSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesViewSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesViewSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
