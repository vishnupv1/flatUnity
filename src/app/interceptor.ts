// auth-interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    user: any
    admin: any
    constructor(private route: ActivatedRoute) {
    }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.user = localStorage.getItem('userToken')
        this.admin = localStorage.getItem('adminToken')
        if (window.location.pathname.includes('/admin') && this.admin) {
            const authToken = this.admin
            const authRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            return next.handle(authRequest);
        }
        else {
            const authToken = this.user
            const authRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return next.handle(authRequest);
        }

    }
}
