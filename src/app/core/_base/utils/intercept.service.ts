// Angular
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
// RxJS
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable()
export class InterceptService implements HttpInterceptor {
  constructor() {
  }

  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = request.url.includes('asset') ? '' : environment.url;
    request = request.clone({
      url: url + request.url
    });

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {

          }
        },
        error => {
        }
      )
    );

  }
}
