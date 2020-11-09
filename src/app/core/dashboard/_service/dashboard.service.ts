import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CommentCountRatingModel} from '../_models/comment-count-rating.model';
import {MonthlyRatingsModel} from '../_models/monthly-ratings.model';
import {CommentCountModel} from '../../inbox/_models/comment-count.model';

const API_DASHBOARD_URL = 'dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  getCommentCountAndRatings(): Observable<CommentCountRatingModel[]> {
    return this.http.get<CommentCountRatingModel[]>(API_DASHBOARD_URL + '/comment-count-ratings');
  }

  getCommentCount(): Observable<CommentCountModel[]> {
    return this.http.get<CommentCountModel[]>(API_DASHBOARD_URL + '/comment-count');
  }

  getMonthlyRating(): Observable<MonthlyRatingsModel> {
    return this.http.get<MonthlyRatingsModel>(API_DASHBOARD_URL + '/monthly-ratings');
  }
}
