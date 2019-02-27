import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

const skipUrls = [
  '/auth/login'
];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();
    const authReq = req.clone(
      {
        setHeaders: {
          Authorization: authToken
        }
      }
    );

    return skipUrls.some((url) => req.url.endsWith(url)) ?
      next.handle(req) :
      next.handle(authReq);
  }
}
