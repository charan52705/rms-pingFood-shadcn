import { TestBed } from '@angular/core/testing';

import { TrackOrdersService } from './track-orders.service';

describe('TrackOrdersService', () => {
  let service: TrackOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
