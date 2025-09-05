import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aside } from './aside';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Aside', () => {
  let component: Aside;
  let fixture: ComponentFixture<Aside>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aside],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Aside);
    fixture.componentRef.setInput('show', true);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
