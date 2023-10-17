// auth-interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const authToken = localStorage.getItem('userToken')
        const authRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return next.handle(authRequest);
    }
}
