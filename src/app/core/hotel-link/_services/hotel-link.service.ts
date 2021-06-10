import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HotelLinkModel} from '../_models/hotel-link.model';

const API_HOTEL_LINK_URL = 'hotel-links';
const API_CRAWL_URL = 'crawl';

@Injectable({
  providedIn: 'root'
})
export class HotelLinkService {
  constructor(private http: HttpClient) {
  }

  getHotelLinks(): Observable<HotelLinkModel> {
    return this.http.get<HotelLinkModel>(API_HOTEL_LINK_URL);
  }

  saveHotelLinks(hotelLink: HotelLinkModel): Observable<HotelLinkModel> {
    return this.http.post<HotelLinkModel>(API_HOTEL_LINK_URL, hotelLink);
  }

  crawlBooking() {
    return this.http.get<Boolean>(API_CRAWL_URL + '/booking');
  }

  crawlGoogle() {
    return this.http.get<Boolean>(API_CRAWL_URL + '/google');
  }

  crawlHolidayCheck() {
    return this.http.get<Boolean>(API_CRAWL_URL + '/holiday-check');
  }

  crawlAgoda() {
    return this.http.get<Boolean>(API_CRAWL_URL + '/agoda');
  }

  crawlHotelsCom() {
    return this.http.get<Boolean>(API_CRAWL_URL + '/hotels-com');
  }

  crawlTripAdvisor() {
    return this.http.get<Boolean>(API_CRAWL_URL + '/trip-advisor');
  }

  crawlOdamax() {
    return this.http.get<Boolean>(API_CRAWL_URL + '/odamax');
  }

  crawlOtelpuan() {
    return this.http.get<Boolean>(API_CRAWL_URL + '/otel-puan');
  }
}
