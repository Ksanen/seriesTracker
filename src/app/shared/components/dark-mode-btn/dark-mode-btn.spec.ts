import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeBtn } from './dark-mode-btn';

describe('DarkModeBtn', () => {
  let component: DarkModeBtn;
  let fixture: ComponentFixture<DarkModeBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkModeBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkModeBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
