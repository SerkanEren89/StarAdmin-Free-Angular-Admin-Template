import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MonthlyCommentModel} from '../_models/monthly-comment.model';

const API_DASHBOARD_URL = 'popularities';

@Injectable({
  providedIn: 'root'
})
export class PopularityService {
  constructor(private http: HttpClient) {
  }

  getCommentCountMonthly(): Observable<MonthlyCommentModel> {
    return this.http.get<MonthlyCommentModel>(API_DASHBOARD_URL + '/monthly');
  }
}
