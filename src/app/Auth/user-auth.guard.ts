import { Observable, map, catchError, of, tap } from 'rxjs';
import { CanActivateFn, UrlTree, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { UserAuthService } from '../services/authServices/user-auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(UserAuthService);
  const router = inject(Router);
  return authService.checkLogin().pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        router.navigate(['home']);
        return false;
      } else {
        return true;
      }
    })
  );
};