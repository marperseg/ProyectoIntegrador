import { TestBed } from '@angular/core/testing';

import { GetInboxService } from './get-inbox.service';

describe('GetInboxService', () => {
  let service: GetInboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
