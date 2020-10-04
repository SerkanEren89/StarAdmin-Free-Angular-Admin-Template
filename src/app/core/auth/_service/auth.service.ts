import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {UserModel} from '../_models/user.model';
import {Router} from '@angular/router';

const API_AUTH_URL = 'auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('revxray-user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    return this.http.post<any>(API_AUTH_URL + `/login`, {email, password})
      .pipe(map(user => {
        localStorage.setItem('revxray-user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(user: UserModel): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<UserModel>(API_AUTH_URL + '/signup', user, {headers: httpHeaders})
      .pipe(
        map((res: UserModel) => {
          return res;
        }),
        catchError(err => {
          return null;
        })
      );
  }

  logout() {
    localStorage.removeItem('revxray-user');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('auth/login');
  }
}