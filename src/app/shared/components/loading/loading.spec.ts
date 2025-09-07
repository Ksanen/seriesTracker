import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loading } from './loading';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Loading', () => {
  let component: Loading;
  let fixture: ComponentFixture<Loading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loading],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Loading);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'loading');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should select right direction when length=0', () => {
    component.direction = 'left';
    component.selectDirection(0);
    expect(component.direction).toBe('right');
  });
  it('should select left direction when length=3', () => {
    component.direction = 'right';
    component.selectDirection(3);
    expect(component.direction).toBe('left');
  });
  it("should add '.' when direction is 'right'", () => {
    component.dots.set('.');
    component.direction = 'right';
    component.updateLoading();
    expect(component.dots()).toBe('..');
  });
  it("should remove '.' when direction is 'left'", () => {
    component.dots.set('..');
    component.direction = 'left';
    component.updateLoading();
    expect(component.dots()).toBe('.');
  });
  it('loading text should be set', () => {
    component.dots.set('..');
    fixture.componentRef.setInput('text', 'test');
    expect(component.loadingText()).toBe('test..');
  });
});
