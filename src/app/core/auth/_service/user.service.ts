import {Injectable} from '@angular/core';
import {UserModel} from '../_models/user.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_USER_URL = 'users';
@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  patchUser(user: UserModel): Observable<UserModel> {
    return this.http.patch<UserModel>(API_USER_URL, user);
  }
}
