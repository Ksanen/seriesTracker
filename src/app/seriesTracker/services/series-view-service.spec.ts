import { TestBed } from '@angular/core/testing';

import { SeriesViewService } from './series-view-service';

describe('SeriesViewService', () => {
  let service: SeriesViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriesViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
