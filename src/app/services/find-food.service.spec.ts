import { TestBed } from '@angular/core/testing';

import { FindFoodService } from './find-food.service';

describe('FindFoodService', () => {
  let service: FindFoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindFoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
