import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTag } from './add-tag';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AddTag', () => {
  let component: AddTag;
  let fixture: ComponentFixture<AddTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTag],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add tag', () => {
    component.tagName = 'testowyTag';
    const startLengthOfTagNames = component.tagNames().length;
    component.addTag();
    fixture.detectChanges();
    const endLengthOfTagNames = component.tagNames().length;
    expect(endLengthOfTagNames).toBe(startLengthOfTagNames + 1);
  });
  it('should not add tag when tagName is empty', () => {
    const startLengthOfTagNames = component.tagNames().length;
    component.tagName = '';
    component.addTag();
    const endLengthOfTagNames = component.tagNames().length;
    expect(endLengthOfTagNames).toBe(startLengthOfTagNames);
  });
  it('should not add duplicates', () => {
    component.tagNames.set(['test']);
    component.tagName = 'test';
    const startLength = component.tagNames.length;
    component.addTag();
    fixture.detectChanges();
    expect(component.tagNames.length).toBe(startLength);
  });
});
