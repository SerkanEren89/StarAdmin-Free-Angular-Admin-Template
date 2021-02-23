import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PersonalModel} from '../_models/personal.model';

const API_PERSONALS_URL = 'personals';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  constructor(private http: HttpClient) {
  }

  getPagedPersonals(page: number, pageSize: number): Observable<PersonalModel[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(pageSize));
    return this.http.get<PersonalModel[]>(API_PERSONALS_URL + '/paged', {params: params});
  }

  getPersonals(): Observable<PersonalModel[]> {
    return this.http.get<PersonalModel[]>(API_PERSONALS_URL);
  }

  savePersonal(personalModel: PersonalModel): Observable<PersonalModel> {
    return this.http.post<PersonalModel>(API_PERSONALS_URL, personalModel);
  }

  deletePersonal(personalModel: PersonalModel): Observable<boolean> {
    return this.http.delete<boolean>(API_PERSONALS_URL + '/' + personalModel.id);
  }
}
