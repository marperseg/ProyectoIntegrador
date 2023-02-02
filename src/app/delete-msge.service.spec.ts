import { TestBed } from '@angular/core/testing';

import { DeleteMsgeService } from './delete-msge.service';

describe('DeleteMsgeService', () => {
  let service: DeleteMsgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteMsgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
