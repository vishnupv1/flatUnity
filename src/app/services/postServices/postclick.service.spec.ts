import { TestBed } from '@angular/core/testing';

import { PostclickService } from './postclick.service';

describe('PostclickService', () => {
  let service: PostclickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostclickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
