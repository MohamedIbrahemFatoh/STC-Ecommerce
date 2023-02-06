import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 0) {
          this.showError('No Internet Connection');
        } else if (err.status === 404) {
          this.router.navigate(['PageNotFound']);
        } else if (err.status === 403) {
          this.router.navigate(['admin/no-permission']);
        }
        // const error = err.error.message || err.statusText;
        return throwError(err.error);
      })
    );
  }

  showError(msg) {
    this.toastr.error(msg);
  }
}
