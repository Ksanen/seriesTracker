import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesContentList } from './series-content-list';

describe('SeriesContentList', () => {
  let component: SeriesContentList;
  let fixture: ComponentFixture<SeriesContentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesContentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesContentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
