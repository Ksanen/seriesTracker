import { TestBed } from '@angular/core/testing';

import { SeriesHelperService } from './series-helper-service';

describe('SeriesHelperService', () => {
  let service: SeriesHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriesHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
