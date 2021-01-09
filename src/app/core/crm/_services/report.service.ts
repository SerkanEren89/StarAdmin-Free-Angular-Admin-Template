import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeeklyReportModel} from '../_models/weekly-report.model';

const API_REPORTS_URL = 'reports';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) {
  }

  sendWeeklyReport(weeklyReportModel: WeeklyReportModel) {
    return this.http.post<WeeklyReportModel>(API_REPORTS_URL + '/weekly', weeklyReportModel);
  }
}
