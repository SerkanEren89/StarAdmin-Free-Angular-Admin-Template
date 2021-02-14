import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OptionModel} from '../_models/option.model';
import {UserOptionModel} from '../_models/user-option.model';

const API_USER_OPTION_URL = 'user-options';

@Injectable({
  providedIn: 'root'
})
export class UserOptionService {

  constructor(private http: HttpClient) {
  }

  getOptions(): Observable<OptionModel[]> {
    return this.http.get<OptionModel[]>(API_USER_OPTION_URL);
  }

  saveUserOption(userOption: UserOptionModel): Observable<OptionModel> {
    return this.http.post<OptionModel>(API_USER_OPTION_URL, userOption);
  }
}
