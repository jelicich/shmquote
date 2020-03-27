import { TestBed } from '@angular/core/testing';

import { BnaService } from './bna.service';

describe('BnaService', () => {
  let service: BnaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BnaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
