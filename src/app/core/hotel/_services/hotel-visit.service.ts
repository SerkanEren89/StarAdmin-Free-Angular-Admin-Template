import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HotelVisitModel} from '../_models/hotel-visit.model';
import {HotelVisitCountModel} from '../_models/hotel-visit-count.model';

const API_HOTEL_VISITS_URL = 'hotel-visits';

@Injectable({
  providedIn: 'root'
})
export class HotelVisitService {
  constructor(private http: HttpClient) {
  }

  getHotelVisits(hotelId: number): Observable<HotelVisitModel[]> {
    return this.http.get<HotelVisitModel[]>(API_HOTEL_VISITS_URL + '/' + hotelId + '/hotel');
  }

  getVisitCountByPersonal(): Observable<HotelVisitCountModel[]> {
    return this.http.get<HotelVisitCountModel[]>(API_HOTEL_VISITS_URL + '/count');
  }

  saveHotelVisit(hotelVisit: HotelVisitModel): Observable<HotelVisitModel> {
    return this.http.post<HotelVisitModel>(API_HOTEL_VISITS_URL, hotelVisit);
  }

  updateHotelVisit(id: number, hotelVisit: HotelVisitModel): Observable<HotelVisitModel> {
    return this.http.put<HotelVisitModel>(API_HOTEL_VISITS_URL + '/' + id, hotelVisit);
  }
}
