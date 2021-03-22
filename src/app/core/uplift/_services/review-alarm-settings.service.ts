import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReviewAlarmSettingsModel} from '../_models/review-alarm-settings.model';

const API_REVIEW_ALARM_SETTINGS_URL = 'review-alarm-settings';

@Injectable({
  providedIn: 'root'
})
export class ReviewAlarmSettingsService {
  constructor(private http: HttpClient) {
  }

  getReviewAlarmSettings(): Observable<ReviewAlarmSettingsModel> {
    return this.http.get<ReviewAlarmSettingsModel>(API_REVIEW_ALARM_SETTINGS_URL);
  }

  saveReviewAlarmSettings(reviewAlarmSettingsModel: ReviewAlarmSettingsModel): Observable<ReviewAlarmSettingsModel> {
    return this.http.post<ReviewAlarmSettingsModel>(API_REVIEW_ALARM_SETTINGS_URL, reviewAlarmSettingsModel);
  }
}
