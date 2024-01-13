// import { CanActivateFn } from '@angular/router';

// export const canAccessAdminGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    return true;
  } else {
    router.navigateByUrl('/auth/login');
    return false;
  }
};
