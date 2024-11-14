import { TestBed } from '@angular/core/testing';

import { FindHotelService } from './find-hotel.service';

describe('FindHotelService', () => {
  let service: FindHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
