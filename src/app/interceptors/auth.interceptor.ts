import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { JwtDecoded } from '../models/jwt-decoded';
import { jwtDecode } from 'jwt-decode';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');


    if (!token) {
      return next.handle(req);
    }

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(clonedRequest);
  }
  isTokenExpired(): boolean {

    const token = localStorage.getItem('token');

    if(!token){
      return true;
    }

    const decoded: JwtDecoded = jwtDecode(token);

    const expiration = decoded.exp * 1000;

    return Date.now() >= expiration;
  }
}


