import { TestBed } from '@angular/core/testing';

import { FilterMsgesService } from './filter-msges.service';

describe('FilterMsgesService', () => {
  let service: FilterMsgesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterMsgesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
