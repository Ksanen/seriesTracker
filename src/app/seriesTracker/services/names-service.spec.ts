import { TestBed } from '@angular/core/testing';

import { NamesService } from './names-service';

describe('NamesService', () => {
  let service: NamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
