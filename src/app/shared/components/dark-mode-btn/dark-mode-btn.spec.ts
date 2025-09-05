import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeBtn } from './dark-mode-btn';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DarkModeBtn', () => {
  let component: DarkModeBtn;
  let fixture: ComponentFixture<DarkModeBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkModeBtn],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DarkModeBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
