import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesAddBtn } from './series-add-btn';

describe('SeriesAddBtn', () => {
  let component: SeriesAddBtn;
  let fixture: ComponentFixture<SeriesAddBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesAddBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesAddBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
