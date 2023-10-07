import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminloginAuthGuard } from './adminlogin-auth.guard';

describe('adminloginAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminloginAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
