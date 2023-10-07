import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  checkLogin(): Observable<boolean> {
    const isLoggedIn = !!localStorage.getItem('userToken');

    return new Observable<boolean>((observer) => {
      observer.next(isLoggedIn);
      observer.complete();
    });
  }
  checkAdminLogin(): Observable<boolean> {
    const isAdminLoggedIn = !!localStorage.getItem('adminToken');

    return new Observable<boolean>((observer) => {
      observer.next(isAdminLoggedIn);
      observer.complete();
    });
  }
}
