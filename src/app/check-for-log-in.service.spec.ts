import { TestBed } from '@angular/core/testing';

import { CheckForLogInService } from './check-for-log-in.service';

describe('CheckForLogInService', () => {
  let service: CheckForLogInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckForLogInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
