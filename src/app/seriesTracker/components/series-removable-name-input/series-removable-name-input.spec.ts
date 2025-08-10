import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesRemovableNameInput } from './series-removable-name-input';

describe('SeriesRemovableNameInput', () => {
  let component: SeriesRemovableNameInput;
  let fixture: ComponentFixture<SeriesRemovableNameInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesRemovableNameInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesRemovableNameInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
