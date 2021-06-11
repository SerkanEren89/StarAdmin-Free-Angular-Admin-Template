import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserLoginModel} from '../_models/user-login.model';
import {TemplateModel} from '../../template/_models/template.model';
import {map} from 'rxjs/operators';

const API_USER_LOGIN_URL = 'user-logins';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http: HttpClient) {
  }

  getUserLoginsByHotelId(hotelId: number): Observable<UserLoginModel[]> {
    return this.http.get<UserLoginModel[]>(API_USER_LOGIN_URL + '/' + hotelId + '/' + 'hotelId');
  }

  saveUserLogin(): Observable<UserLoginModel> {
    return this.http.post<UserLoginModel>(API_USER_LOGIN_URL, null)
      .pipe(map(result => {
        return result;
      }));
  }
}
