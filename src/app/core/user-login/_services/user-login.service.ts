import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserLoginModel} from '../_models/user-login.model';

const API_USER_LOGIN_URL = 'user-logins';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http: HttpClient) {
  }

  getUserLoginsByUserId(userId: number): Observable<UserLoginModel[]> {
    return this.http.get<UserLoginModel[]>(API_USER_LOGIN_URL + '/' + userId + '/' + 'userId');
  }
}
