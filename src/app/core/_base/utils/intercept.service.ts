// Angular
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
// RxJS
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {UserModel} from '../../auth/_models/user.model';

@Injectable()
export class InterceptService implements HttpInterceptor {
  constructor(private router: Router) {

  }

  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = request.url.includes('asset') ? '' : environment.url;
    const currentUser = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('revxray-user'))).getValue();
    if (currentUser != null) {
      request = request.clone({
        url: url + request.url,
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    } else {
      request = request.clone({
        url: url + request.url
      });
    }

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {

          }
        },
        error => {
          if (error.status === 401) {
            localStorage.removeItem('revxray-user');
            this.router.navigateByUrl('/auth/login');
          } else {
          }
        }
      )
    );
  }
}
