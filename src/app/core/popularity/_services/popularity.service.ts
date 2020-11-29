import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MonthlyCommentModel} from '../_models/monthly-comment.model';

const API_POPULARITY_URL = 'popularities';

@Injectable({
  providedIn: 'root'
})
export class PopularityService {
  constructor(private http: HttpClient) {
  }

  getCommentCountMonthly(interval): Observable<MonthlyCommentModel> {
    let params = new HttpParams();
    params = params.append('interval', String(interval));
    return this.http.get<MonthlyCommentModel>(API_POPULARITY_URL + '/monthly', {params: params});
  }
}
