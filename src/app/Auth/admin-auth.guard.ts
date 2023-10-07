import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { inject } from '@angular/core';
import { UserAuthService } from '../services/authServices/user-auth.service';

export const adminAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(UserAuthService);
  const router = inject(Router);
  return authService.checkAdminLogin().pipe(
    map((isAdminLoggedIn) => {
      if (isAdminLoggedIn) {
        router.navigate(['/admin/adminhome']);
        return false;
      } else {
        return true;
      }
    })
  );
};
