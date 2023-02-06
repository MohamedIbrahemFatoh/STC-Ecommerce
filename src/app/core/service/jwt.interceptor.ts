import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const language = localStorage.getItem('language') || 'en';
    request = request.clone({
      setHeaders: {
        'accept-language': language,
        lang: language,
      },
    });
    // this.dateReplacer(request.body);
    return next.handle(request);
  }
}
