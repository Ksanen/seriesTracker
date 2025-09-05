import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tag } from './tag';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Tag', () => {
  let component: Tag;
  let fixture: ComponentFixture<Tag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tag],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Tag);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tagName', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
