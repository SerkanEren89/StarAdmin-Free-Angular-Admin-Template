import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HotelTemplateModel} from '../_models/hotel-template.model';

const API_HOTEL_TEMPLATE_URL = 'hotel-templates';

@Injectable({
  providedIn: 'root'
})
export class HotelTemplateService {
  constructor(private http: HttpClient) {
  }

  getHotelTemplate(template: string): Observable<HotelTemplateModel> {
    return this.http.get<HotelTemplateModel>(API_HOTEL_TEMPLATE_URL + '/' + template);
  }

  saveHotelVisit(hotelVisit: HotelTemplateModel): Observable<HotelTemplateModel> {
    return this.http.post<HotelTemplateModel>(API_HOTEL_TEMPLATE_URL, hotelVisit);
  }

  updateHotelVisit(id: number, hotelVisit: HotelTemplateModel): Observable<HotelTemplateModel> {
    return this.http.put<HotelTemplateModel>(API_HOTEL_TEMPLATE_URL + '/' + id, hotelVisit);
  }
}
