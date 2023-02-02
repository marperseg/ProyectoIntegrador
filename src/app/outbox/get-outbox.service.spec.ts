import { TestBed } from '@angular/core/testing';

import { GetOutboxService } from './get-outbox.service';

describe('GetOutboxService', () => {
  let service: GetOutboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOutboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
