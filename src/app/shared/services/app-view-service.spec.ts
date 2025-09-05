import { TestBed } from '@angular/core/testing';

import { AppViewService } from './app-view-service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AppViewService', () => {
  let service: AppViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(AppViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
