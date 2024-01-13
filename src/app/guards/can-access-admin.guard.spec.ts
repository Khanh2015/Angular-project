import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canAccessAdminGuard } from './can-access-admin.guard';

describe('canAccessAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canAccessAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
