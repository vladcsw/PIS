import { TestBed } from '@angular/core/testing';

import { FirstServideService } from './first-servide.service';

describe('FirstServideService', () => {
  let service: FirstServideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstServideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
