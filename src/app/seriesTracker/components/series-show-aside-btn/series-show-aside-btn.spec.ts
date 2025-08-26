import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesShowAsideBtn } from './series-show-aside-btn';

describe('SeriesShowAsideBtn', () => {
  let component: SeriesShowAsideBtn;
  let fixture: ComponentFixture<SeriesShowAsideBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesShowAsideBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesShowAsideBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
