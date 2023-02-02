import { TestBed } from '@angular/core/testing';

import { MarkAsReadService } from './mark-as-read.service';

describe('MarkAsReadService', () => {
  let service: MarkAsReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkAsReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
