import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WidgetSettingsModel} from '../_models/widget-settings.model';

const API_WIDGET_SETTINGS_URL = 'widget-settings';

@Injectable({
  providedIn: 'root'
})
export class WidgetSettingsService {
  constructor(private http: HttpClient) {
  }

  getWidgetSettings(): Observable<WidgetSettingsModel> {
    return this.http.get<WidgetSettingsModel>(API_WIDGET_SETTINGS_URL);
  }

  saveWidgetSettings(widgetSettingsModel: WidgetSettingsModel): Observable<WidgetSettingsModel> {
    return this.http.post<WidgetSettingsModel>(API_WIDGET_SETTINGS_URL, widgetSettingsModel);
  }
}
