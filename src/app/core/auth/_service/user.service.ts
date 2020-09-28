import {Injectable} from '@angular/core';
import {UserModel} from '../_models/user.model';
import {HttpClient} from '@angular/common/http';

const API_USER_URL = 'users';
@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<UserModel[]>(API_USER_URL);
  }

  register(user: UserModel) {
    return this.http.post(API_USER_URL + `/register`, user);
  }

  delete(id: number) {
    return this.http.delete(API_USER_URL + `/${id}`);
  }
}
