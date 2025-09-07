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
    const startLengthOfTagNames = component.tagNames.length;
    component.addTag();
    fixture.detectChanges();
    const endLengthOfTagNames = component.tagNames.length;
    expect(endLengthOfTagNames).toBe(startLengthOfTagNames + 1);
  });
  it('should emit tagNames', () => {
    spyOn(component.addNewTag, 'emit');
    component.tagName = 'test';
    component.addTag();
    expect(component.addNewTag.emit).toHaveBeenCalledWith(component.tagNames);
  });
  it('should not emit  when tagName is empty', () => {
    spyOn(component.addNewTag, 'emit');
    component.tagName = '';
    component.addTag();
    expect(component.addNewTag.emit).toHaveBeenCalledTimes(0);
  });
  it('should not add duplicates', () => {
    component.tagNames = ['test'];
    component.tagName = 'test';
    const startLength = component.tagNames.length;
    component.addTag();
    fixture.detectChanges();
    expect(component.tagNames.length).toBe(startLength);
  });
});
