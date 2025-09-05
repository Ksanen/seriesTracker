import { TestBed } from '@angular/core/testing';
import { NamesService } from './names-service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NamesService', () => {
  let service: NamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(NamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should remove name from array', () => {
    const result = service.removeName(
      [
        {
          id: 1,
          value: 'nazwa1',
        },
        {
          id: 2,
          value: 'nazwa2',
        },
      ],
      1
    );
    expect(result).toEqual([
      {
        id: 2,
        value: 'nazwa2',
      },
    ]);
  });
});
