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
});
