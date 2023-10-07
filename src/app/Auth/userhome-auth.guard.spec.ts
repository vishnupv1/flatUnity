import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userhomeAuthGuard } from './userhome-auth.guard';

describe('userhomeAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userhomeAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
